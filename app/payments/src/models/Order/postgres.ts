import { OrderDatabase, Order } from "./Order"
import { Pool } from "pg"
import { OrderStatus } from "@weibuddies/common"

const pg = new Pool()

export const postgres_db: OrderDatabase = {
  async getOrder(id) {
    const query = {
      name: 'get-order',
      text: 'SELECT * FROM orders WHERE id = $1',
      values: [id],
    }
    try {
      return await pg.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async createOrder(userId: number, status: OrderStatus, expires_at: Date, product_id: number) {
    const query = {
      name: 'create-order',
      text: 'INSERT INTO orders VALUES ($1, $2, $3, $4)',
      values: [userId, status, expires_at, product_id],
    }
    try {
      return await pg.query(query).then(response => response.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async removeOrder(order_id: number): Promise<Order> {
    const query = {
      name: 'remove-order',
      text: 'UPDATE orders SET order_status = "cancelled" WHERE id = $1',
      values: [order_id],
    }
    try {
      return await pg.query(query).then(res => res.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  }
}