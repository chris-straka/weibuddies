import { AbstractListener, Topic, IOrderCancelled } from '@weibuddies/common';
import { productDb } from '../../models/Product';
import { ProductUpdatedPublisher } from '../publishers/ProductUpdatedPublisher';
import { producer } from '../../kafka';

// When an order is cancelled, I want to make sure that it's no longer attached to the product
export class OrderCancelledListener extends AbstractListener<IOrderCancelled> {
  topic: Topic.OrderCancelled = Topic.OrderCancelled;

  async onMessage(data: IOrderCancelled['data']) {
    const product = await productDb.getProduct(data.productId);
    if (!product) throw new Error('Product not found');
    await productDb.setOrderIdForProduct(data.productId, null);

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
