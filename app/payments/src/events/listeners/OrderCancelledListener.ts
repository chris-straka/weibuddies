import { AbstractListener, OrderStatus, Subjects, IOrderCancelled } from '@weibuddies/common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { Order } from 'models/Order';
import { Message } from 'node-nats-streaming';

export class OrderCancelledListener extends AbstractListener<IOrderCancelled> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCancelled['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) throw new Error('[Payments] Order not found');

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}