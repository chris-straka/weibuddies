import { AbstractListener, Subjects, IOrderCreated } from '@weibuddies/common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { Order } from 'models/Order';
import { Message } from 'node-nats-streaming';

export class OrderCreatedListener extends AbstractListener<IOrderCreated> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCreated['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.product.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();
    msg.ack();
  }
}
