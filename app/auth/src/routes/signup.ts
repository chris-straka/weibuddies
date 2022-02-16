import { validateRequest, BadRequestError } from "@weibuddies/common"
import express, { Request, Response } from 'express';
import { body } from "express-validator"
import jwt from 'jsonwebtoken'


const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  res.send("currentUser route hit")
})

export { router as signUpRouter };