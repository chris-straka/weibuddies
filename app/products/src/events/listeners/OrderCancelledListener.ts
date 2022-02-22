import { AbstractListener, Subjects, IOrderCancelled, } from '@weibuddies/common';
import { queueGroupName } from './queueGroupName';
import { ProductUpdatedPublisher } from '../publishers/ProductUpdatedPublisher';
import { product_db } from '../../models/Product';
import { Message } from 'node-nats-streaming';

export class OrderCancelledListener extends AbstractListener<IOrderCancelled> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCancelled['data'], msg: Message) {
    const product = await product_db.getProduct(data.product.id);
    if (!product) throw new Error('[Products] Product not found');

    // product.setId({ orderId: undefined });
    product_db.removeProduct(data.product.id)

    await new ProductUpdatedPublisher(this.client).publish({
      id: product.id,
      price: product.price,
      title: product.title,
      userId: product.userId,
      orderId: product.orderId,
      version: product.version
    });

    msg.ack();
  }
}
