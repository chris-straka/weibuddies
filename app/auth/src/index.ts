import { Pool } from "pg"
import { app } from "./app"

const PORT = 3000

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error("[Auth] Can't find the JWT_KEY")
  if (!process.env.PGHOST) throw new Error("[Auth] Can't find PGHOST")

  try {
    // the environment variables are set by k8s
    const client = new Pool()
    await client.connect()
    console.log("connected to the database")
  } catch (error) {
    console.error(error)
  }

  app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
}

init()
