import { Consumer, KafkaMessage } from "kafkajs"
import { Subjects } from './Subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class AbstractListener<T extends Event> {
  abstract subject: T['subject'];
  abstract onMessage(data: T['data'], msg: KafkaMessage): void;
  protected client: Consumer;
  protected ackWait = 5 * 1000;

  constructor(client: Consumer) {
    this.client = client;
  }
}
