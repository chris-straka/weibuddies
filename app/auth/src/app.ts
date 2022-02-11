import express from "express"
import { currentUserRouter } from "./routes/currentuser"
import { signInRouter } from "./routes/signin"
import { signOutRouter } from "./routes/signout"
import { signUpRouter } from "./routes/signup"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(currentUserRouter)

export { app }
