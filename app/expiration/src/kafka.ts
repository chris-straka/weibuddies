import { OrderStatus } from '@weibuddies/common';
import { Kafka } from 'kafkajs';
import Queue from 'bull';
import { Payload } from './interface';

if (!process.env.REDIS_HOST) throw new Error("Can't find redis");
if (!process.env.KAFKA_HOST) throw new Error("Can't find kafka");
if (!process.env.KAFKA_ADVERTISED_LISTENERS) throw new Error("Can't find kafka brokers");

const kafkaBrokers = process.env.KAFKA_ADVERTISED_LISTENERS.split(' ');

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
    await consumer.subscribe({ topic: 'orders', fromBeginning: true });
  } catch (error) {
    throw new Error(error as string);
  }
};

export const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

// Everytime a new order is created, push a job onto the Queue
export const orderCreatedListener = async (delay: number) => {
  try {
    await consumer.run({
      async eachMessage({ message }) {
        if (message.key?.toString() === OrderStatus.Created) {
          expirationQueue.add({ orderId: message.value!.toString() }, { delay });
        }
      },
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

// After the delay, pop the job off the queue and tell everyone the order is now cancelled
expirationQueue.process(async (job) => {
  await producer.send({
    topic: 'orders',
    messages: [{ key: OrderStatus.Cancelled, value: job.data.orderId }],
  });
});
