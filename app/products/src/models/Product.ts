import { postgres_db } from "../database/postgres"
import { ProductDatabase } from "../database/interface";

const Product = (db: ProductDatabase) => ({
  createProduct(userId: string) {
    return db.createProduct(userId)
  },
  getProduct(email: string) {
    return db.getProduct(email)
  }
})

export const user = Product(postgres_db)