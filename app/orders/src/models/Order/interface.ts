import { OrderStatus } from '@weibuddies/common';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  productId: string;
  productPrice: number;
  version: number;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  isReserved(): Promise<boolean>;
}

export interface IOrderDatabase {
  getOrder: (orderId: string) => Promise<Order>;
  getOrders: (userId: string) => Promise<Order[]>;
  setOrderStatus: (orderId: string, newStatus: OrderStatus) => Promise<null>;
  createOrder: (
    userId: string,
    status: OrderStatus,
    expiresAt: Date,
    productId: string,
  ) => Promise<Order>;
}
