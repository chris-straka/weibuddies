import { OrderStatus } from '@weibuddies/common';
import { producer, consumer, orderCreatedListener } from '../kafka';

jest.setTimeout(20000);
jest.useFakeTimers();

beforeAll(async () => {
  await producer.connect();
  await consumer.connect();
});

describe('Expiration', () => {
  test('Producer/consumer is sending/receiving messages correctly', async () => {
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: 'foo' }],
    });

    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
      async eachMessage({ message }) {
        if (!message) console.log('there was no message found');
        expect(message.value?.toString()).toBe('foo');
      },
    });
  });

  test('Consumer is reading and cancelling orders', async () => {
    const delay = 1000; // 1 second
    await consumer.subscribe({ topic: 'orders', fromBeginning: true });
    await orderCreatedListener(delay);

    await producer.send({
      topic: 'orders',
      messages: [{ key: OrderStatus.Created, value: 'foo' }],
    });

    await consumer.run({
      async eachMessage({ message }) {
        if (!message) console.log('there was no message found');
        expect(message.value?.toString()).toBe('foo');
      },
    });
  });
});
