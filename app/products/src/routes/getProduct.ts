import { Router } from 'express';
import { sanitizeQuery } from 'express-validator';
import { getProducts } from "../controller/productController"

const router = Router();

router.get('/api/products', sanitizeQuery('productId').escape(), getProducts);

export { router as showProductRouter };
