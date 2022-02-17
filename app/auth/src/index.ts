import { app } from "./app"

const PORT = 3000

const init = () => {
  if (!process.env.JWT_KEY) throw new Error("[Auth] Can't find the JWT_KEY")
  if (!process.env.PGHOST) throw new Error("[Auth] Can't find PGHOST")

  app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
}

init()
