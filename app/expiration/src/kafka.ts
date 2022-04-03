import { Kafka } from 'kafkajs';

if (!process.env.KAFKA_ADVERTISED_LISTENERS) throw new Error("Can't find kafka brokers");

const kafkaBrokers = process.env.KAFKA_ADVERTISED_LISTENERS.split(' ');

const kafka = new Kafka({
  clientId: 'expirationService',
  brokers: kafkaBrokers,
  retry: {
    retries: 20,
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'expirationGroup' });

export const kafkaInit = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'orders', fromBeginning: true });
  } catch (error) {
    throw new Error(error as string);
  }
};
