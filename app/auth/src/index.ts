import { Client } from "pg"
import { app } from "./app"

const PORT = 3000

const init = async () => {
  if (!process.env.JWT_KEY) throw new Error("[Auth] Can't find the JWT_KEY")
  if (!process.env.PGHOST) throw new Error("[Auth] Can't find PGHOST")

  try {
    const client = new Client()
    await client.connect()
    console.log("connected to the database")
    await client.end()
  } catch (error) {
    console.error(error)
  }

  app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
}

init()
