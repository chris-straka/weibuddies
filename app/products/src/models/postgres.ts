import { ProductDatabase, Product } from "./Product"
import { Pool } from "pg"

if (!process.env.PGHOST) throw new Error("[Products] Can't find PGHOST")

const pg = new Pool()

export const postgres_db: ProductDatabase = {
  getProduct() { },
  createProduct() { },
  removeProduct() { },
  setProduct() { }
}