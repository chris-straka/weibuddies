import { OrderDatabase, Order } from "./Order"
import { Pool } from "pg"

const pg = new Pool()

export const postgres_db: OrderDatabase = {
  getOrder(email: string): any {
    console.log(pg)
  },
  createOrder(email: string, password: string): any {
    console.log(pg)
  },
  setOrder(email: string) {}
}