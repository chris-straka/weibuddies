import { OrderStatus } from "@weibuddies/common"
import { postgres_db } from "./postgres"

export interface Payment {
  id: string;
  version: number;
  userId: string,
  price: number,
  status: OrderStatus,
}

export interface PaymentDatabase {
  getPayment: (email: string) => Payment,
  createPayment: (email: string, password: string) => Payment
}

const Payment = (db: PaymentDatabase): PaymentDatabase => ({
  getPayment(email: string): any { },
  createPayment(email: string): any { },
})

export const payment_db = Payment(postgres_db)