import { AbstractListener, Topic, IOrderCreated } from '@weibuddies/common';
import { productDb } from '../../models/Product';
import { producer } from '../kafka';
import { ProductUpdatedPublisher } from '../publishers/ProductUpdatedPublisher';

// When an order is created for a product I want to make sure , I want to make sure the
export class OrderCreatedListener extends AbstractListener<IOrderCreated> {
  topic: Topic.OrderCreated = Topic.OrderCreated;

  groupId = 'productsGroup';

  async onMessage(data: IOrderCreated['data']) {
    const product = await productDb.getProduct(data.product.id);
    if (!product) throw new Error('Product not found');
    await productDb.setOrderIdForProduct(data.product.id, data.id);

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
