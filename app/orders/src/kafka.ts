import { Kafka } from 'kafkajs';

if (!process.env.CLIENT_ID) throw new Error('[Products] Client-ID must be defined');
if (!process.env.BROKERS) throw new Error("[Products] Can't find a list of brokers");

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: process.env.BROKERS.split(' '),
  requestTimeout: 3000,
  connectionTimeout: 6000,
  ssl: false,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'ordersGroup' });

export const kafkaInit = async () => {
  try {
    await producer.connect();
    await consumer.connect();
  } catch (error) {
    throw new Error(error as string);
  }
};
