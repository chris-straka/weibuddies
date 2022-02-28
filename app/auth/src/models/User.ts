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
  async createUser(email: string, password: string) {
    const hashedPassword = await Password.toHash(password)
    return db.createUser(email, hashedPassword)
  },
  getUser(email: string) {
    return db.getUser(email)
  }
})

export const user_db = User(postgres_db)