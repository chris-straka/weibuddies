import { Router } from 'express';
import { getProducts } from '../controller/productController';

const router = Router();

router.get('/api/products/:id', getProducts);

export { router as showProductRouter };
