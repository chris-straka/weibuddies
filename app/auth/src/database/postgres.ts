import { Database } from "./interface"
import { User } from "./interface"
import { Pool } from "pg"

// Coding to the Database interface instead of an implementation
declare module "pg" {
  interface Pool extends Database {}
}

Pool.prototype.getUser = (email: string): any => { }

Pool.prototype.createUser = (email: string, password: string): any => { }

export const postgres_db: Database = new Pool()