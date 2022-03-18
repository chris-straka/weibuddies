import Queue from 'bull';
import { Kafka } from 'kafkajs';
import { OrderStatus } from '@weibuddies/common';

interface Payload { orderId: string; }

const delay = 1000 * 60 * 60 * 24; // 1 day

const kafkaInit = async () => {
  if (!process.env.CLIENT_ID) throw new Error('[Products] Client-ID must be defined');
  if (!process.env.BROKERS) throw new Error("[Products] Can't find a list of brokers");

  const kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: process.env.BROKERS.split(' '),
  });

  const producer = kafka.producer();
  const consumer = kafka.consumer({ groupId: 'products-group' });

  try {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'orders-topic' });

    await consumer.run({
      async eachMessage({ topic, partition, message }) {
        if (message.value?.toString() === OrderStatus.Created) {
          await expirationQueue.add(message.value as any, { delay });
        }
      },
    });

    const expirationQueue = new Queue<Payload>('order:expiration', {
      redis: {
        host: process.env.REDIS_HOST,
      },
    });

    // This will run after the delay and cancel the order
    expirationQueue.process(async (job) => {
      producer.send({
        topic: 'cancelled-orders',
        messages: [
          { key: 'orderId', value: job.data.orderId },
        ],
      });
    });

    return {
      producer,
      consumer,
    };
  } catch (error) {
    console.log(error);
  }
};

export const kafka = kafkaInit();
