import { postgresDb } from './postgres';
import { IProductDatabase } from './interface';

const ProductDatabase = (db: IProductDatabase): IProductDatabase => ({
  getProduct(productId) {
    return db.getProduct(productId);
  },
  createProduct(productId, title, price) {
    return db.createProduct(productId, title, price);
  },
  updateProduct(productId, title, price) {
    return db.updateProduct(productId, title, price);
  },
});

export const productDb = ProductDatabase(postgresDb);
