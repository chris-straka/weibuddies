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
  getOrder: (email: string) => Order,
  createOrder: (email: string, password: string) => Order
  setOrder: (id: string, setStatus: string) => any
}

const Order = (db: OrderDatabase): OrderDatabase => ({
  createOrder(email: string, password: string): any { },
  getOrder(email: string): any { },
  setOrder(id: string, setStatus: string): any { }
})

export const order_db = Order(postgres_db)