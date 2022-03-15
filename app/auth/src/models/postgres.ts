import { UserDatabase, User } from "./User"
import { Pool } from "pg"

let pool = new Pool()

export const postgres_db: UserDatabase = {
  getUser(email: string): Promise<User> {
    const query = {
      name: 'getUser',
      text: 'SELECT * FROM users WHERE email = $1;',
      values: [email],
    }
    return pool.query(query).then(data => data.rows[0])
  },
  createUser(email: string, password: string): Promise<User> {
    const query = {
      name: 'createUser',
      text: 'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *;',
      values: [email, password],
    }
    return pool.query(query).then(data => data.rows[0])
  }
}