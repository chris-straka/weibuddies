import { currentUser } from '@weibuddies/common';
import { getCurrentUser } from '../controller/userController';
import { Router } from 'express';

const router = Router();

router.get('/api/users/currentuser', currentUser, getCurrentUser)

export { router as currentUserRouter };
