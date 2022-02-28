import { Subjects, AbstractListener, IPaymentCreated, OrderStatus } from '@weibuddies/common';
import { queueGroupName } from './queueGroupName';
import { Order } from '../../models/Order/interface';
import { Message } from 'node-nats-streaming';

export class PaymentCreatedListener extends AbstractListener<IPaymentCreated> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IPaymentCreated['data'], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) throw new Error('Order not found');

    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    msg.ack();
  }
}
