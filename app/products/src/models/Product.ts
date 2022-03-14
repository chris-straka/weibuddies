import { postgres_db } from "./postgres"

export interface Product {
  id: number,
  title: string,
  price: number,
  userId: number,
  orderId: string,
  version: number
}

export interface ProductDatabase {
  getProduct: (id: number) => Promise<Product>,
  createProduct: (title: string, price: number, userId: number) => Promise<Product>,
  // removeProduct: (productId: string) => Promise<Product>,
  // setProduct: (title: string, price: string) => Promise<Product>
}

const Product = (db: ProductDatabase): ProductDatabase => ({
  async getProduct(id: number) {
    return await db.getProduct(id)
  },
  async createProduct(title: string, price: number, userId: number) {
    return await db.createProduct(title, price, userId)
  },
  // async removeProduct(productId: string) {
  //   return await db.removeProduct(productId)
  // },
  // async setProduct(title: string, price: string) {
  //   return await db.setProduct(title, price)
  // }
})

export const product_db = Product(postgres_db)