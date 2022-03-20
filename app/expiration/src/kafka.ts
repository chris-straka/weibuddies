import Queue from 'bull';
import { Kafka } from 'kafkajs';
import { OrderStatus } from '@weibuddies/common';
import { Payload } from './interface';

if (!process.env.KAFKA_HOST) throw new Error('[Expiration] Client-ID must be defined');
if (!process.env.KAFKA_ADVERTISED_LISTENERS) throw new Error("Can't find any brokers");

const delay = 1000 * 60 * 60 * 24; // 1 day
const kafkaBrokers = process.env.KAFKA_ADVERTISED_LISTENERS.split(' ');

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

export const kafka = new Kafka({
  clientId: process.env.KAFKA_HOST,
  brokers: kafkaBrokers,
  retry: {
    retries: 15,
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'expiration-group' });

export const kafkaInit = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'orders' });

    expirationQueue.process(async (job) => {
      producer.send({
        topic: 'orders',
        messages: [{ key: 'orderId', value: job.data.orderId }],
      });
    });

    await consumer.run({
      async eachMessage({ message }) {
        if (message.value?.toString() === OrderStatus.Created) {
          await expirationQueue.add(message.value as any, { delay });
        }
      },
    });
  } catch (error) {
    throw new Error(error as string);
  }
};
