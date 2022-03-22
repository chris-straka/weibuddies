import { OrderStatus } from '@weibuddies/common';
import { postgresDb } from './postgres';
import { IOrderDatabase } from './interface';

const OrderDatabase = (db: IOrderDatabase): IOrderDatabase => ({
  async getOrderWithProduct(id: string) {
    return db.getOrderWithProduct(id);
  },
  async getAllOrdersWithProducts(id: string) {
    return db.getAllOrdersWithProducts(id);
  },
  async createOrder(userId: string, status: OrderStatus, expires_at: Date, product_id: string) {
    return db.createOrder(userId, status, expires_at, product_id);
  },
  async removeOrder(id: string) {
    return db.removeOrder(id);
  },
});

export const orderDb = OrderDatabase(postgresDb);
