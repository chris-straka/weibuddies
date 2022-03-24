import { AbstractListener, IOrderCancelled, Topic, OrderStatus } from '@weibuddies/common';
import { orderDb } from 'models/Order/Order';

export class OrderCancelledListener extends AbstractListener<IOrderCancelled> {
  topic: Topic.OrderCancelled = Topic.OrderCancelled;

  async onMessage(data: IOrderCancelled['data']) {
    const order = await orderDb.getOrder(data.id);
    if (!order) throw new Error('Order not found');

    await orderDb.setOrderStatus(data.id, OrderStatus.Cancelled);
  }
}
