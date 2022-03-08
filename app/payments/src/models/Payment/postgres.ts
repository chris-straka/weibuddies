import { PaymentDatabase, Payment } from "./Payment"
import { Pool } from "pg"

let pg = new Pool()

export const postgres_db: PaymentDatabase = {
  async createPayment(currency: string, amount: number, source: string) {
    const query = {
      name: 'create-payment',
      text: 'INSERT INTO payments VALUES ($1, $2, $3, $4)',
      values: [currency, amount, source],
    }
    try {
      return await pg.query(query).then(response => response.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  },
}