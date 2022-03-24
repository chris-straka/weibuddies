import { Topic, AbstractListener, IProductCreated } from '@weibuddies/common';
import { productDb } from '../../models/Product/Product';

// Creates a product everytime a new one is created in app/products
export class ProductCreatedListener extends AbstractListener<IProductCreated> {
  topic: Topic.ProductCreated = Topic.ProductCreated;

  async onMessage(data: IProductCreated['data']) {
    const { id, title, price } = data;
    await productDb.createProduct(id, title, price);
  }
}
