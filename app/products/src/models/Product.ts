import { postgres_db } from "../database/postgres"
import { ProductDatabase } from "../database/interface";

const Product = (db: ProductDatabase) => ({
  createProduct(orderId: string) {
    return db.createProduct(orderId)
  },
  getProduct(email: string) {
    return db.getProduct(email)
  },
  removeProduct(productId: string) {
    console.log(productId)
  },
  setProduct(title: string, price: string) {
    console.log(title)
    console.log(price)
  }
})

export const product_db = Product(postgres_db)