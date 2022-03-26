import { Topic, AbstractListener, IProductCreated } from '@weibuddies/common';
import { productDb } from '../../models/Product/Product';

// Duplicate all new products from /app/products in the orders service too
export class ProductCreatedListener extends AbstractListener<IProductCreated> {
  topic: Topic.ProductCreated = Topic.ProductCreated;

  async onMessage(data: IProductCreated['data']) {
    const { id, title, price } = data;
    await productDb.createProduct(id, title, price);
  }
}
