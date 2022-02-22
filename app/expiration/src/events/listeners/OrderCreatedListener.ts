import { AbstractListener, IOrderCreated, Subjects } from '@weibuddies/common';
import { queueGroupName } from './queueGroupName';
import { expirationQueue } from '../../queues/expiration-queue';
import { Message } from 'node-nats-streaming';

export class OrderCreatedListener extends AbstractListener<IOrderCreated> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCreated['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add({ orderId: data.id, }, { delay, });
    msg.ack();
  }
}
