import { postgresDb } from './postgres';
import { IOrderDatabase } from './interface';

const OrderDatabase = (db: IOrderDatabase): IOrderDatabase => ({
  getOrder(id) {
    return db.getOrder(id);
  },
  getOrders() {
    return db.getOrders();
  },
  setOrderStatus(id, newStatus) {
    return db.setOrderStatus(id, newStatus);
  },
  createOrder(userId, status, expiresAt, productId) {
    return db.createOrder(userId, status, expiresAt, productId);
  },
});

export const orderDb = OrderDatabase(postgresDb);
