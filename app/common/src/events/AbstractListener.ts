import { Subjects } from './Subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class AbstractListener<T extends Event, U> {
  abstract subject: T['subject'];
  abstract onMessage(data: T['data'], msg: string): void;
  protected client: U;

  constructor(client: U) {
    this.client = client;
  }
}
