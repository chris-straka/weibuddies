import { ProductDatabase, Product } from "./Product"
import { Pool } from "pg"

const pg = new Pool()

export const postgres_db: ProductDatabase = {
  async getProduct(productId: string): Promise<Product> {
    const query = {
      name: 'getProduct',
      text: 'SELECT * FROM orders WHERE id = $1;',
      values: [productId],
    }
    try {
      return await pg.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getProductsFromLowerToUpper(lowerBound: string, upperBound: string): Promise<Product[]> {
    const query = {
      name: 'getProductsFromPage',
      text: 'SELECT * FROM orders ORDER BY date_created DESC OFFSET $1 LIMIT $2;',
      values: [lowerBound, upperBound]
    }
    try {
      return await pg.query(query).then(data => data.rows)
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async createProduct(title: string, price: string, userId: string) {
    const query = {
      name: 'createProduct',
      text: 'INSERT INTO products(title, price, userId) VALUES ($1, $2, $3) RETURNING *;',
      values: [title, price, userId],
    }
    try {
      return await pg.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async updateProduct(title: string, price: string) {
    const query = {
      name: 'updateProduct',
      text: 'UPDATE products SET title = $1 AND price = $2 RETURNING *;',
      values: [title, price],
    }
    try {
      return await pg.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async removeProduct(productId: string) {
    const query = {
      name: 'removeProduct',
      text: 'DELETE FROM products WHERE id = $1 RETURNING *;',
      values: [productId],
    }
    try {
      return await pg.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  }
}
