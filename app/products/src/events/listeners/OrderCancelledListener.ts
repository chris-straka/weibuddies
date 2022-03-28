import { AbstractListener, Topic, IOrderCancelled } from '@weibuddies/common';
import { productDb } from '../../models/Product';
import { ProductUpdatedPublisher } from '../publishers/ProductUpdatedPublisher';
import { producer } from '../../kafka';

// When an order gets cancelled in the orders service...
// I want to make sure that the product is no longer associated with that order

export class OrderCancelledListener extends AbstractListener<IOrderCancelled> {
  topic: Topic.OrderCancelled = Topic.OrderCancelled;

  async onMessage(data: IOrderCancelled['data']) {
    const product = await productDb.getProduct(data.productId);
    if (!product) throw new Error('Product not found');
    await productDb.setOrderId(data.productId, null);

    await new ProductUpdatedPublisher(producer).publish({
      id: product.id,
      price: product.price,
      title: product.title,
      userId: product.userId,
      orderId: product.orderId,
      version: product.version,
    });
  }
}
