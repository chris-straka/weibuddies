import { postgresDb } from './postgres';
import { IProductDatabase } from './interface';

const ProductDatabase = (db: IProductDatabase): IProductDatabase => ({
  async getProduct(id: string) {
    return db.getProduct(id);
  },
  async createProduct(title: string, price: string) {
    return db.createProduct(title, price);
  },
});

export const productDb = ProductDatabase(postgresDb);
