import { Producer } from 'kafkajs';
import { Topic } from './Topics';

interface Event {
  topic: Topic;
  data: any;
}

export abstract class AbstractPublisher<T extends Event> {
  abstract topic: T['topic'];

  protected producer: Producer;

  constructor(producer: Producer) {
    this.producer = producer;
  }

  async publish(data: T['data']): Promise<void> {
    try {
      await this.producer.send({
        topic: this.topic,
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
