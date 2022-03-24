import { OrderStatus } from '@weibuddies/common';

export interface Order {
  id: string;
  price: number;
  status: OrderStatus;
  userId: string;
  version: number;
}

export interface IOrderDatabase {
  getOrder: (orderId: string) => Promise<Order>;
  setOrderStatus: (orderId: string, newStatus: OrderStatus) => Promise<Order>;
  createOrder: (
    id: string,
    price: number,
    status: OrderStatus,
    userId: string,
    version: number,
  ) => Promise<Order>;
}
