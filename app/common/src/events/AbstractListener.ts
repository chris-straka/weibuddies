import { Message, Consumer } from 'kafkajs';
import { Topic } from './Topics';

interface Event {
  topic: Topic;
  data: any;
}

export abstract class AbstractListener<T extends Event> {
  abstract topic: T['topic'];

  abstract groupId: string;

  abstract onMessage(data: T['data']): void;

  protected consumer: Consumer;

  constructor(consumer: Consumer) {
    this.consumer = consumer;
  }

  async listen() {
    const { parseMessage, onMessage } = this;
    try {
      await this.consumer.run({
        async eachMessage({ message }) {
          const parsedData = parseMessage(message);
          onMessage(parsedData);
        },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  /* eslint-disable class-methods-use-this */
  parseMessage(msg: Message) {
    if (!msg.value) throw new Error("Couldn't find the message");
    const data = msg.value;
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
  }
}
