import { Subjects, AbstractListener, IProductCreated } from '@weibuddies/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { Product } from '../../models/Product/Product';

export class ProductCreatedListener extends AbstractListener<IProductCreated> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IProductCreated['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Product.build({
      id,
      title,
      price,
    });

    await ticket.save();

    msg.ack();
  }
}
