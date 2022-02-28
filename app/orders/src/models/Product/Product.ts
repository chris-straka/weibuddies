import { postgres_db } from "./postgres"

export interface Product {
  id: number,
  email: string,
  password: string
}

export interface ProductDatabase {
  getProduct: (email: string) => Product,
  createProduct: (email: string, password: string) => Product
}

const Product = (db: ProductDatabase): ProductDatabase => ({
  getProduct(email: string) {
    return db.getProduct(email)
  },
  createProduct(email: string, password: string) {
    return db.createProduct(email, password)
  }
})

export const product_db = Product(postgres_db)