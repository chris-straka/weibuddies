import { Producer } from 'kafkajs';
import { Subjects } from './Subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class AbstractPublisher<T extends Event> {
  abstract subject: T['subject'];
  protected client: Producer;

  constructor(client: Producer) {
    this.client = client;
  }
}
