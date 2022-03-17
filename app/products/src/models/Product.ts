import { postgres_db } from "./postgres"

export interface Product {
  id: string,
  title: string,
  price: string,
  userId: string,
  orderId: string,
  version: string,
  date_created: Date
}

export interface ProductDatabase {
  getProduct: (productId: string) => Promise<Product>,
  getProductsFromLowerToUpper: (lowerBound: string, upperBound: string) => Promise<Product[]>,
  createProduct: (title: string, price: string, userId: string) => Promise<Product>,
  removeProduct: (productId: string) => Promise<Product>,
  updateProduct: (title: string, price: string) => Promise<Product>
}

const Product = (db: ProductDatabase): ProductDatabase => ({
  async getProduct(id: string) {
    return await db.getProduct(id)
  },
  async getProductsFromLowerToUpper(lowerBound: string, upperBound: string) {
    return await db.getProductsFromLowerToUpper(lowerBound, upperBound)
  },
  async createProduct(title: string, price: string, userId: string) {
    return await db.createProduct(title, price, userId)
  },
  async removeProduct(productId: string) {
    return await db.removeProduct(productId)
  },
  async updateProduct(title: string, price: string) {
    return await db.updateProduct(title, price)
  }
})

export const product_db = Product(postgres_db)