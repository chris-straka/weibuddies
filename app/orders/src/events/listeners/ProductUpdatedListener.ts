import { Topic, AbstractListener, IProductCreated, IProductUpdated } from '@weibuddies/common';
import { productDb } from '../../models/Product/Product';

// Updates a product whenever it gets updated in app/products
export class ProductUpdatedListener extends AbstractListener<IProductCreated> {
  topic: Topic.ProductCreated = Topic.ProductCreated;

  groupId = 'ordersGroup';

  async onMessage(data: IProductUpdated['data']) {
    const product = await productDb.getProduct(data.id);
    if (!product) throw new Error('Product not found');
    const { id, title, price } = data;
    await productDb.updateProduct(id, title, price);
  }
}
