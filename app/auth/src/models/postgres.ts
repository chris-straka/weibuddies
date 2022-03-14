import { UserDatabase, User } from "./User"
import { Pool, DatabaseError } from "pg"

let pool = new Pool()

export const postgres_db: UserDatabase = {
  async getUser(email: string, password: string): Promise<User> {
    const query = {
      name: 'get-user',
      text: 'SELECT * FROM users WHERE email = $1 AND password = $2;',
      values: [email, password],
    }
    try {
      return await pool.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error((error as DatabaseError).stack as string)
    }
  },
  async createUser(email: string, password: string): Promise<User> {
    const query = {
      name: 'create-user',
      text: 'INSERT INTO users(email, password) VALUES ($1, $2);',
      values: [email, password],
    }
    try {
      return await pool.query(query).then(response => response.rows[0])
    } catch (error) {
      throw new Error((error as DatabaseError).stack as string)
    }
  }
}