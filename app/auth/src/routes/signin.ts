import express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  res.send("currentUser route hit")
})

export { router as signInRouter };
