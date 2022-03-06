import { Router } from 'express';
import { requireAuth } from '@weibuddies/common';
import { getOrder } from '../controller/orderController';

const router = Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  getOrder
);

export { router as showOrderRouter };
