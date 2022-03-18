import { OrderStatus } from '@weibuddies/common';

export interface Order {
  id: string
  price: string
  userId: string
  status: OrderStatus
  expiresAt: Date
  product: Product
  version: number
}

export interface IOrderDatabase {
  getOrder: (orderId: number) => Promise<Order>,
  removeOrder: (id: number) => Promise<Order>
  createOrder: (
    userId: number, status: OrderStatus, expires_at: Date, product_id: number) => Promise<Order>
}

export interface Product {
  id: number
  title: string
  price: number
}
