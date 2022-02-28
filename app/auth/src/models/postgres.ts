import { UserDatabase, User } from "./User"
import { Pool } from "pg"

let pg = new Pool()

export const postgres_db: UserDatabase = {
  getUser(email: string): any {
    console.log(pg)
  },
  createUser(email: string, password: string): any {
    console.log(pg)
  }
}