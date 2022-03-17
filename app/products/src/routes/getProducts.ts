import { Router } from 'express';
import { getProducts } from "../controller/productController"
import { sanitizeQuery } from "express-validator"
import { validateRequest } from "@weibuddies/common"

const router = Router();

router.get('/api/products', sanitizeQuery('page').escape(), validateRequest, getProducts);

export { router as indexProductRouter };
