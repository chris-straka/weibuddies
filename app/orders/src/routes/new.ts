import { Router } from 'express';
import { requireAuth, validateRequest } from '@weibuddies/common';
import { body } from 'express-validator';
import { newOrder } from '../controller/orderController';

const router = Router();

router.post(
  '/api/orders',
  requireAuth,
  [body('ticketId').not().isEmpty().withMessage('TicketId must be provided')],
  validateRequest,
  newOrder
);

export { router as newOrderRouter };
