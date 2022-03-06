import { UserDatabase, User } from "./User"
import { Pool } from "pg"

let pg = new Pool()

export const postgres_db: UserDatabase = {
  async getUser(email: string): Promise<User> {
    const query = {
      name: 'get-user',
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    }
    try {
      return await pg.query(query).then(data => data.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async createUser(email: string, password: string): Promise<User> {
    const query = {
      name: 'get-user',
      text: 'INSERT INTO users(email, password) WHERE VALUES ($1, $2)',
      values: [email, password],
    }
    try {
      return await pg.query(query).then(response => response.rows[0])
    } catch (error) {
      throw new Error(error as string)
    }
  }
}