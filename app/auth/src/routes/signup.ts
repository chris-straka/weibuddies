import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  res.send("currentUser route hit")
})

export { router as signUpRouter };