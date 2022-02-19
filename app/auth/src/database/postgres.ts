import { UserDatabase } from "./interface"
import { User } from "./interface"
import { Pool } from "pg"

// Coding to the Database interface instead of an implementation
declare module "pg" {
  interface Pool extends UserDatabase {}
}

Pool.prototype.getUser = (email: string): any => { }

Pool.prototype.createUser = (email: string, password: string): any => { }

export const postgres_db: UserDatabase = new Pool()