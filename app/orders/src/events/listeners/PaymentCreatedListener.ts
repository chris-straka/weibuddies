import { Topic, AbstractListener, IPaymentCreated, OrderStatus } from '@weibuddies/common';
import { orderDb } from '../../models/Order/Order';

// Mark an order as complete upon payment
export class PaymentCreatedListener extends AbstractListener<IPaymentCreated> {
  topic: Topic.PaymentCreated = Topic.PaymentCreated;

  async onMessage(data: IPaymentCreated['data']) {
    const order = await orderDb.getOrder(data.orderId);
    if (!order) throw new Error('Order not found');
    await orderDb.setOrderStatus(order.id, OrderStatus.Complete);
  }
}
