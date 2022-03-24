import { Kafka } from 'kafkajs';
// import { OrderStatus } from '@weibuddies/common';

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
export const consumer = kafka.consumer({ groupId: 'products-group' });

export const kafkaInit = async () => {
  try {
    await consumer.connect();
    await producer.connect();
    await consumer.subscribe({ topic: 'orders-topic' });
    await consumer.run({
      // async eachMessage({ topic, partition, message }) {
      // if (message.value?.toString() === OrderStatus.Cancelled) orderCancelledHandler(producer);
      // if (message.value?.toString() === OrderStatus.Created) orderCreatedHandler(producer);
      // },
    });
  } catch (error) {
    throw new Error(error as string);
  }
};
