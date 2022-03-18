import { OrderStatus } from '@weibuddies/common';
import { postgresDb } from './postgres';
import { IOrderDatabase } from './interface';

const OrderDatabase = (db: IOrderDatabase): IOrderDatabase => ({
  async getOrder(id: number) {
    return db.getOrder(id);
  },
  async createOrder(userId: number, status: OrderStatus, expires_at: Date, product_id: number) {
    return db.createOrder(userId, status, expires_at, product_id);
  },
  async removeOrder(id: number) {
    return db.removeOrder(id);
  },
});

export const orderDb = OrderDatabase(postgresDb);
