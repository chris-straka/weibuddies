import { ProductDatabase, Product } from "./Product"
import { Pool } from "pg"

const pg = new Pool()

export const postgres_db: ProductDatabase = {
  getProduct() { },
  createProduct() { },
  removeProduct() { },
  setProduct() { }
}