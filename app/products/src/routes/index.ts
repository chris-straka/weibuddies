import { Router } from 'express';
import { getProduct } from "../controller/productController"

const router = Router();

router.get('/api/products', getProduct);

export { router as indexProductRouter };
