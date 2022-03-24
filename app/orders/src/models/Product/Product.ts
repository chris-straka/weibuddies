import { postgresDb } from './postgres';
import { IProductDatabase } from './interface';

const ProductDatabase = (db: IProductDatabase): IProductDatabase => ({
  getProduct(id) {
    return db.getProduct(id);
  },
  createProduct(id, title, price) {
    return db.createProduct(id, title, price);
  },
  updateProduct(id, title, price) {
    return db.updateProduct(id, title, price);
  },
});

export const productDb = ProductDatabase(postgresDb);
