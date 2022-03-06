import { requireAuth, validateRequest } from '@weibuddies/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { updateProduct } from '../controller/productController';

const router = Router();

router.put(
  '/api/products/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  updateProduct
);

export { router as updateProductRouter };
