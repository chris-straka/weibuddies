import { postgres_db } from "./postgres"

export interface Product {
  id: number,
  title: string,
  price: number
}

export interface ProductDatabase {
  getProduct: (id: number) => Promise<Product>,
  createProduct: (title: string, price: number) => Promise<Product>
}

const ProductDatabase = (db: ProductDatabase): ProductDatabase => ({
  async getProduct(id: number) {
    return db.getProduct(id)
  },
  async createProduct(title: string, price: number) {
    return db.createProduct(title, price)
  }
})

export const product_db = ProductDatabase(postgres_db)