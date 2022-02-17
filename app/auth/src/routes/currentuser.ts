import { currentUser } from '@weibuddies/common';
import { getCurrentUser } from '../controller/userController';
import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, getCurrentUser)

export { router as currentUserRouter };
