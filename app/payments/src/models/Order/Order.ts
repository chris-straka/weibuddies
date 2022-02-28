import { OrderStatus } from "@weibuddies/common"
import { postgres_db } from "./postgres"

export interface Order {
  id: string;
  version: number;
  userId: string,
  price: number,
  status: OrderStatus,
}

export interface OrderDatabase {
  getOrder: (email: string) => Order,
  createOrder: (email: string, password: string) => Order
  setOrder: (id: string, setStatus: string) => any
}

const Order = (db: OrderDatabase): OrderDatabase => ({
  getOrder(email: string): any { },
  createOrder(email: string): any { },
  setOrder() { }
})

export const order_db = Order(postgres_db)
