import { postgresDb } from './postgres';
import { IOrderDatabase } from './interface';

const OrderDatabase = (db: IOrderDatabase): IOrderDatabase => ({
  getOrder(id) {
    return db.getOrder(id);
  },
  createOrder(id, price, status, userId, version) {
    return db.createOrder(id, price, status, userId, version);
  },
  setOrderStatus(id, newStatus) {
    return db.setOrderStatus(id, newStatus);
  },
});

export const orderDb = OrderDatabase(postgresDb);
