import { OrderDatabase, Order } from "./Order"
import { Pool } from "pg"

let pg = new Pool()

export const postgres_db: OrderDatabase = {
  getOrder(email: string): any {
    console.log(pg)
  },
  createOrder(email: string, password: string): any {
    console.log(pg)
  },
  setOrder(email: string) { }
}