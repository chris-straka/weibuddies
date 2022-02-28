import { PaymentDatabase, Payment } from "./Payment"
import { Pool } from "pg"

let pg = new Pool()

export const postgres_db: PaymentDatabase = {
  getPayment(email: string): any {
    console.log(pg)
  },
  createPayment(email: string, password: string): any {
    console.log(pg)
  },
}