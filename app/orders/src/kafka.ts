import { Kafka } from 'kafkajs';

if (!process.env.KAFKA_ADVERTISED_LISTENERS) throw new Error("Can't find a list of brokers");

const kafka = new Kafka({
  clientId: 'orderService',
  brokers: process.env.KAFKA_ADVERTISED_LISTENERS.split(' '),
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
