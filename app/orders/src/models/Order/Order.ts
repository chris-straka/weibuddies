import { OrderStatus } from '@weibuddies/common';
import { postgresDb } from './postgres';
import { IOrderDatabase } from './interface';

const OrderDatabase = (db: IOrderDatabase): IOrderDatabase => ({
  async getOrder(id: string) {
    return db.getOrder(id);
  },
  async getAllOrders(id: string) {
    return db.getAllOrders(id);
  },
  async createOrder(userId: string, status: OrderStatus, expires_at: Date, product_id: string) {
    return db.createOrder(userId, status, expires_at, product_id);
  },
  async removeOrder(id: string) {
    return db.removeOrder(id);
  },
});

export const orderDb = OrderDatabase(postgresDb);
