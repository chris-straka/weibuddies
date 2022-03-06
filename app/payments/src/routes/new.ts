import { requireAuth, validateRequest } from '@weibuddies/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { createPayment } from 'controller/paymentController';

const router = Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  createPayment
);

export { router as createChargeRouter };
