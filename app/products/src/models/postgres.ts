import { ProductDatabase } from "./Product"
import { Pool } from "pg"

if (!process.env.PGHOST) throw new Error("[Products] Can't find PGHOST")

const pg = new Pool()

export const postgres_db: ProductDatabase = ({
  async getProduct(id: number) {
    const query = {
      name: 'get-product',
      text: 'SELECT * FROM orders WHERE id = $1;',
      values: [id],
    }
    try {
      return await pg.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async createProduct(title: string, price: number, userId: number) {
    const query = {
      name: 'get-product',
      text: 'INSERT INTO products VALUES ($1, $2, $3);',
      values: [title, price, userId],
    }
    try {
      return await pg.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  }, 
})