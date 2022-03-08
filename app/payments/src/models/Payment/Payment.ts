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
  createPayment: (currency: string, amount: number, source: string) => Promise<Payment>
}

const Payment = (db: PaymentDatabase): PaymentDatabase => ({
  async createPayment(currency: string, amount: number, source: string) {
    return await db.createPayment(currency, amount, source)
  },
})

export const payment_db = Payment(postgres_db)