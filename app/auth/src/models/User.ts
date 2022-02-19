import { postgres_db } from "../database/postgres"
import { UserDatabase } from "../database/interface";
import { Password } from "../services/password";

const User = (db: UserDatabase) => ({
  async createUser(email: string, password: string) {
    const hashedPassword = await Password.toHash(password)
    return db.createUser(email, hashedPassword)
  },
  getUser(email: string) {
    return db.getUser(email)
  }
})

export const user = User(postgres_db)