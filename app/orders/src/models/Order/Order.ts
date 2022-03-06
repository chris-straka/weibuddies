import { postgres_db } from "./postgres"
import { OrderStatus } from "@weibuddies/common"
import { Product } from "../Product/Product"

export interface Order {
  userId: string,
  status: OrderStatus,
  expiresAt: Date,
  product: Product
  version: number
}

export interface OrderDatabase {
  getOrder: (orderId: number) => Promise<Order>,
  createOrder: (userId: string, status: OrderStatus, expires_at: Date, product_id: number) => Promise<Order>
  removeOrder: (id: string, setStatus: string) => Promise<Order>
}

const Order = (db: OrderDatabase): OrderDatabase => ({
  async getOrder(id: number) {
    return await db.getOrder(id)
  },
  async createOrder(userId: string, status: OrderStatus, expires_at: Date, product_id: number) {
    return await db.createOrder(userId, status, expires_at, product_id)
  },
  async removeOrder(id: string, setStatus: string): any {
    return await db.removeOrder()
  }
})

export const order_db = Order(postgres_db)