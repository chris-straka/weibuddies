import { Subjects } from './Subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class AbstractPublisher<T extends Event, U> {
  abstract subject: T['subject'];
  protected client: U;

  constructor(client: U) {
    this.client = client;
  }
}
