import { Router } from 'express';
import { requireAuth } from '@weibuddies/common';
import { getOrders } from '../controller/orderController';

const router = Router();

router.get('/api/orders', requireAuth, getOrders)
export { router as indexOrderRouter };