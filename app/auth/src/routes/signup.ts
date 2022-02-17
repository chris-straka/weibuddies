import { validateRequest } from "@weibuddies/common"
import express from 'express';
import { body } from "express-validator"
import { signUpUser } from "../controller/userController";

const router = express.Router();

router.post('/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  signUpUser
)

export { router as signUpRouter };