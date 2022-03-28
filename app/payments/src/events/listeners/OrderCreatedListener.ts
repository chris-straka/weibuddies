import { AbstractListener, IOrderCreated, Topic } from '@weibuddies/common';
import { orderDb } from '../../models/Order/Order';

// Everytime an order is created in app/orders I want to recreate it here too
export class OrderCreatedListener extends AbstractListener<IOrderCreated> {
  topic: Topic.OrderCreated = Topic.OrderCreated;

  async onMessage(data: IOrderCreated['data']) {
    await orderDb.createOrder(data.id, data.product.price, data.status, data.userId, data.version);
  }
}
