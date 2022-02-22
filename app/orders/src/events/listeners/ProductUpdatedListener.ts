import { Subjects, AbstractListener, IProductUpdated } from '@weibuddies/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { Product } from '../../models/Product';

export class ProductUpdatedListener extends AbstractListener<IProductUpdated> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: IProductUpdated['data'], msg: Message) {
    const ticket = await Product.findByEvent(data);
    if (!ticket) throw new Error('Ticket not found');

    const { title, price } = data;

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    msg.ack();
  }
}
