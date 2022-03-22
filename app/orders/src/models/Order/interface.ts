import { OrderStatus } from '@weibuddies/common';

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  expiresAt: Date
  productId: string
  version: string
}

export interface Product {
  id: string
  title: string
  price: string
  isReserved(): Promise<boolean>
}

export interface IOrderDatabase {
  getOrderWithProduct: (orderId: string) => Promise<Order>
  getAllOrdersWithProducts: (userId: string) => Promise<Order[]>
  removeOrder: (id: string) => Promise<Order>
  createOrder: (
    userId: string, status: OrderStatus, expires_at: Date, product_id: string) => Promise<Order>
}
