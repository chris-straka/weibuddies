import { Router } from 'express';
import { getProduct } from "../controller/productController"

const router = Router();

router.get('/api/products/:id', getProduct);

export { router as showProductRouter };