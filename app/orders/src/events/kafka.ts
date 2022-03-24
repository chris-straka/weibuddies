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
export const consumer = kafka.consumer({ groupId: 'orders-group' });

export const kafkaInit = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'products' });
    await consumer.subscribe({ topic: 'payments' });

    // Wait on expiration complete,
    // payment created,
    // product created and updated
    await consumer.run({});
  } catch (error) {
    throw new Error(error as string);
  }
};
