import { AbstractListener, Topic, IOrderCreated } from '@weibuddies/common';
import { productDb } from '../../models/Product';
import { ProductUpdatedPublisher } from '../publishers/ProductUpdatedPublisher';
import { producer } from '../../kafka';

// When an order is created for a product I want to make sure , I want to make sure the
export class OrderCreatedListener extends AbstractListener<IOrderCreated> {
  topic: Topic.OrderCreated = Topic.OrderCreated;

  async onMessage(data: IOrderCreated['data']) {
    const product = await productDb.getProduct(data.productId);
    if (!product) throw new Error('Product not found');
    await productDb.setOrderIdForProduct(data.productId, data.id);

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
