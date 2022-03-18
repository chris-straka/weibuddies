import { currentUser } from '@weibuddies/common';
import { Router } from 'express';
import { getCurrentUser } from '../controller/userController';

const router = Router();

router.get('/api/users/currentuser', currentUser, getCurrentUser);

export { router as currentUserRouter };
