import { AbstractListener, Topic, IOrderCreated } from '@weibuddies/common';
import { expirationQueue } from '../../kafka';

export class OrderCreatedListener extends AbstractListener<IOrderCreated> {
  topic: Topic.OrderCreated = Topic.OrderCreated;

  async onMessage(data: IOrderCreated['data']) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add({ orderId: data.id }, { delay });
  }
}
