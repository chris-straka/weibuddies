import { postgresDb } from './postgres';
import { IOrderDatabase } from './interface';

const OrderDatabase = (db: IOrderDatabase): IOrderDatabase => ({
  getOrder(orderId) {
    return db.getOrder(orderId);
  },
  createOrder(orderId, price, status, userId, version) {
    return db.createOrder(orderId, price, status, userId, version);
  },
  setOrderStatus(orderId, newStatus) {
    return db.setOrderStatus(orderId, newStatus);
  },
});

export const orderDb = OrderDatabase(postgresDb);
