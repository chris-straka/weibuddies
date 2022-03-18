import { IProductDatabase } from './interface';
import { postgresDb } from './postgres';

const ProductDatabase = (db: IProductDatabase): IProductDatabase => ({
  async getProduct(id: string) {
    return db.getProduct(id);
  },
  async getProductsFromLowerToUpper(lowerBound: string, upperBound: string) {
    return db.getProductsFromLowerToUpper(lowerBound, upperBound);
  },
  async createProduct(title: string, price: string, userId: string) {
    return db.createProduct(title, price, userId);
  },
  async removeProduct(productId: string) {
    return db.removeProduct(productId);
  },
  async updateProduct(title: string, price: string) {
    return db.updateProduct(title, price);
  },
});

export const productDb = ProductDatabase(postgresDb);
