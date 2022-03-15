import { Request, Response, NextFunction } from "express"
import { BadRequestError } from "@weibuddies/common"
import { user_db } from "../models/User"
import { sign } from "jsonwebtoken"
import { Password } from "../services/password"

export const getCurrentUser = (req: Request, res: Response) => res.send({ currentUser: req.currentUser || null })

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const existingUser = await user_db.getUser(email)
    if (!existingUser) throw new BadRequestError("The user does not yet exist")

    const matchingPassword = await Password.compare(existingUser.password, password)
    if (!matchingPassword) throw new BadRequestError("The passwords don't match")

    const userJwt = sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);

    req.session = { jwt: userJwt }
    return res.sendStatus(200)

  } catch (error) {
    next(error)
  }
}

export const signOutUser = (req: Request, res: Response) => {
  req.session = null
  return res.sendStatus(200)
}

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const emailAlreadyInUse = await user_db.getUser(email) // stops here
    if (emailAlreadyInUse) throw new BadRequestError('A user with this email already exists')

    const newUser = await user_db.createUser(email, password)
    const userJwt = sign({ id: newUser.id, email: newUser.email }, process.env.JWT_KEY!)

    req.session = { jwt: userJwt }
    return res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}
