import { Router } from 'express';
import { signOutUser } from '../controller/userController';

const router = Router();

router.post('/api/users/signout', signOutUser)

export { router as signOutRouter };