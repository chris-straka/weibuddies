import { producer, consumer } from '../kafka';

beforeAll(async () => {
  await producer.connect();
  await consumer.connect();
  jest.setTimeout(30000);
});

describe('Expiration', () => {
  test('Send a message and then have a consumer respond', async () => {
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: 'Hello KafkaJS user!' }],
    });

    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        if (!message) console.log('there was no message found');
        console.log({
          value: message.value?.toString(),
        });
      },
    });
  });
});
