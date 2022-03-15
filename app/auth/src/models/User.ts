import { postgres_db } from "./postgres"
import { Password } from "../services/password";

export interface User {
  id: number,
  email: string,
  password: string
}

export interface UserDatabase {
  getUser: (email: string) => Promise<User>,
  createUser: (email: string, password: string) => Promise<User>
}

const User = (db: UserDatabase): UserDatabase => ({
  async getUser(email: string) {
    return await db.getUser(email)
  },
  async createUser(email: string, password: string) {
    const hashedPassword = await Password.toHash(password)
    return await db.createUser(email, hashedPassword)
  },
})

export const user_db = User(postgres_db)