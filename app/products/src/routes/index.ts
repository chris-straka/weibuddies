import { Router } from 'express';
import { sanitizeQuery } from 'express-validator';
import { validateRequest } from '@weibuddies/common';
import { getProducts } from '../controller/productController';

const router = Router();

router.get('/api/products', sanitizeQuery('page').escape(), validateRequest, getProducts);

export { router as indexProductRouter };
