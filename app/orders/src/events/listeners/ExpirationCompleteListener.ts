import { AbstractListener, Topic, IExpirationComplete, OrderStatus } from '@weibuddies/common';
import { OrderCancelledPublisher } from '../publishers/OrderCancelledPublisher';
import { orderDb } from '../../models/Order/Order';
import { producer } from '../kafka';

// Cancels an order whenever it expires
export class ExpirationCompleteListener extends AbstractListener<IExpirationComplete> {
  topic: Topic.ExpirationComplete = Topic.ExpirationComplete;

  groupId = 'ordersGroup';

  async onMessage(data: IExpirationComplete['data']) {
    const order = await orderDb.getOrder(data.orderId);
    if (!order) throw new Error('Order not found');

    if (order.status !== OrderStatus.Complete) {
      await orderDb.setOrderStatus(order.id, OrderStatus.Cancelled);
      await new OrderCancelledPublisher(producer).publish({
        id: order.id,
        version: order.version,
        product: {
          id: order.productId,
        },
      });
    }
  }
}
