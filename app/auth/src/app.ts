import express, { Request, Response, NextFunction } from "express"
import { errorHandler, NotFoundError } from "@weibuddies/common"
import cookieSession from "cookie-session"
import { currentUserRouter } from "./routes/currentuser"
import { signInRouter } from "./routes/signin"
import { signOutRouter } from "./routes/signout"
import { signUpRouter } from "./routes/signup"

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError())
})

app.use(errorHandler);

export { app }