import { postgresDb } from './postgres';
import { IOrderDatabase } from './interface';

const OrderDatabase = (db: IOrderDatabase): IOrderDatabase => ({
  getOrder(orderId) {
    return db.getOrder(orderId);
  },
  getOrders(userId) {
    return db.getOrders(userId);
  },
  setOrderStatus(orderId, newStatus) {
    return db.setOrderStatus(orderId, newStatus);
  },
  createOrder(userId, status, expiresAt, productId) {
    return db.createOrder(userId, status, expiresAt, productId);
  },
});

export const orderDb = OrderDatabase(postgresDb);
