import { IProductDatabase } from './interface';
import { postgresDb } from './postgres';

const ProductDatabase = (db: IProductDatabase): IProductDatabase => ({
  getProduct(id) {
    return db.getProduct(id);
  },
  getProductsFromLowerToUpper(lowerBound, upperBound) {
    return db.getProductsFromLowerToUpper(lowerBound, upperBound);
  },
  createProduct(title, price, userId) {
    return db.createProduct(title, price, userId);
  },
  removeProduct(productId) {
    return db.removeProduct(productId);
  },
  setOrderIdForProduct(productId, newOrderId) {
    return db.setOrderIdForProduct(productId, newOrderId);
  },
  updateProduct(title, price) {
    return db.updateProduct(title, price);
  },
});

export const productDb = ProductDatabase(postgresDb);
