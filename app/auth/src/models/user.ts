import { postgres_db } from "../database/postgres"
import { Database } from "../database/interface";
import { Password } from "../services/password";

class User {
  #db: Database

  constructor(database: Database) {
    this.#db = database
  }

  async createUser(email: string, password: string) {
    const hashedPassword = await Password.toHash(password)
    return this.#db.createUser(email, hashedPassword)
  }

  getUser(email: string) {
    return this.#db.getUser(email)
  }
}

export const user = new User(postgres_db)