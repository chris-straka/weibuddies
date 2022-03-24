import { Router } from 'express';
import { requireAuth } from '@weibuddies/common';
import { deleteOrder } from '../controller/orderController';

const router = Router();

router.delete('/api/orders/:orderId', requireAuth, deleteOrder);

export { router as deleteOrderRouter };
