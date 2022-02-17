import express from 'express';
import { signOutUser } from '../controller/userController';

const router = express.Router();

router.post('/api/users/signout', signOutUser)

export { router as signOutRouter };