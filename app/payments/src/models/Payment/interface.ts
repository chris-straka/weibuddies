import { OrderStatus } from '@weibuddies/common';

export interface Payment {
  id: string
  version: number
  userId: string
  price: number
  status: OrderStatus
}

export interface IPaymentDatabase {
  createPayment: (orderId: string, paymentId: string) => Promise<Payment>
}
