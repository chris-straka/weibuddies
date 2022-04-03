import { Kafka } from 'kafkajs';

if (!process.env.KAFKA_ADVERTISED_LISTENERS) throw new Error("Can't find a list of brokers");

const kafkaBrokers = process.env.KAFKA_ADVERTISED_LISTENERS.split(' ');

const kafka = new Kafka({
  clientId: 'productService',
  brokers: kafkaBrokers,
  retry: {
    retries: 20,
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'productsGroup' });

export const kafkaInit = async () => {
  try {
    await consumer.connect();
    await producer.connect();
  } catch (error) {
    throw new Error(error as string);
  }
};
