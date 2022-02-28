import { AbstractListener, IExpirationComplete, Subjects, OrderStatus } from '@weibuddies/common';
import { queueGroupName } from './queueGroupName';
import { order_db } from '../../models/Order/Order';
import { OrderCancelledPublisher } from '../publishers/OrderCancelledPublisher';
import { Message } from 'node-nats-streaming';

export class ExpirationCompleteListener extends AbstractListener<IExpirationComplete> {
  queueGroupName = queueGroupName;
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  async onMessage(data: IExpirationComplete['data'], msg: Message) {
    const order = await order_db.getOrder(data.orderId)
    if (!order) throw new Error('Order not found');
    if (order.status === OrderStatus.Complete) return msg.ack();

    order_db.set("id", "cancelled");

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      product: {
        id: order.product.id,
      },
    });

    msg.ack();
  }
}
