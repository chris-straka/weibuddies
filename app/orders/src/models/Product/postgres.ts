import { ProductDatabase } from "./Product"
import { Pool } from "pg"

let pg = new Pool()

export const postgres_db: ProductDatabase = ({
  getProduct(email: string): any {
    console.log(pg)
  },
  createProduct(email: string, password: string): any {
    console.log(pg)
  }
})