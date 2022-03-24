import { AbstractListener, IOrderCreated, Topic } from '@weibuddies/common';
import { orderDb } from 'models/Order/Order';

export class OrderCreatedListener extends AbstractListener<IOrderCreated> {
  topic: Topic.OrderCreated = Topic.OrderCreated;

  groupId = 'paymentsGroup';

  async onMessage(data: IOrderCreated['data']) {
    await orderDb.createOrder(data.id, data.product.price, data.status, data.userId, data.version);
  }
}
