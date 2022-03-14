import { Request, Response } from "express"
import { BadRequestError } from "@weibuddies/common"
import { user_db } from "../models/User"
import { sign } from "jsonwebtoken"

export const getCurrentUser = (req: Request, res: Response) => res.send({ currentUser: req.currentUser || null })

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existingUser = await user_db.getUser(email, password)
  if (!existingUser) throw new BadRequestError('Invalid credentials')

  const userJwt = sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);

  req.session = { jwt: userJwt }
  return res.status(200).send(existingUser)
}

export const signOutUser = (req: Request, res: Response) => {
  req.session = null
  return res.send({})
}

export const signUpUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log(email, password)
  const existingUser = await user_db.getUser(email, password)
  if (existingUser) throw new BadRequestError('[Auth] Email in use')

  const newUser = await user_db.createUser(email, password)

  const userJwt = sign(
    {
      id: newUser.id,
      email: newUser.email
    },
    process.env.JWT_KEY!
  )

  req.session = { jwt: userJwt }

  return res.status(201).send(user_db)
}
