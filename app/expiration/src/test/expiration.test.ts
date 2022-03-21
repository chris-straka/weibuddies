import { OrderStatus } from '@weibuddies/common';
import { producer, consumer } from '../kafka';

jest.setTimeout(2000000);
jest.useFakeTimers();

beforeAll(async () => {
  await producer.connect();
  await consumer.connect();
});

describe('Expiration', () => {
  test('Send a message and then have a consumer respond', async () => {
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

  test('The message should get added to the queue and then released', async () => {
    await producer.send({
      topic: 'orders',
      messages: [{ key: OrderStatus.Created, value: 'foo' }],
    });

    await consumer.subscribe({ topic: 'orders', fromBeginning: true });

    const delay = 1000 * 60 * 60 * 24; // 1 day

    await consumer.run({
      async eachMessage({ message }) {
        if (message.key?.toString() === OrderStatus.Created) {
          await expirationQueue.add(
            {
              orderId: message.value!.toString(),
            },
            {
              delay,
            },
          );
        }
        if (message.key?.toString() === OrderStatus.Created) {
          expect(message.value?.toString() === 'foo');
        }
      },
    });

    expirationQueue.process(async (job) => {
      console.log(job);
      await producer.send({
        topic: 'orders',
        messages: [{ key: OrderStatus.Cancelled, value: job.data.orderId }],
      });
    });

    setTimeout(() => {
      console.log('done timer');
    }, delay);
  });
});
