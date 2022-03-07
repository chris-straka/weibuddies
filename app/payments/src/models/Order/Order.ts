import { postgres_db } from "./postgres"
import { OrderStatus } from "@weibuddies/common"

export interface Order {
  userId: string,
  status: OrderStatus,
  expiresAt: Date,
  product: Product
  version: number
}

export interface Product {
  id: number,
  title: string,
  price: number
}

export interface OrderDatabase {
  getOrder: (orderId: number) => Promise<Order>,
  createOrder: (userId: number, status: OrderStatus, expires_at: Date, product_id: number) => Promise<Order>
  removeOrder: (id: number) => Promise<Order>
}

const OrderDatabase = (db: OrderDatabase): OrderDatabase => ({
  async getOrder(id: number) {
    return await db.getOrder(id)
  },
  async createOrder(userId: number, status: OrderStatus, expires_at: Date, product_id: number) {
    return await db.createOrder(userId, status, expires_at, product_id)
  },
  async removeOrder(id: number) {
    return await db.removeOrder(id)
  }
})

export const order_db = OrderDatabase(postgres_db)
