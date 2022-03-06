import { postgres_db } from "./postgres"

export interface Product {
  id: string,
  title: string,
  price: number,
  userId: string,
  orderId: string,
  version: number
}

export interface ProductDatabase {
  getProduct: (id: string) => any,
  createProduct: (userId: string) => any,
  removeProduct: (productId: string) => any,
  setProduct: (title: string, price: string) => any
}

const Product = (db: ProductDatabase): ProductDatabase => ({
  getProduct(email: string) {
    return db.getProduct(email)
  },
  createProduct(orderId: string) {
    return db.createProduct(orderId)
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