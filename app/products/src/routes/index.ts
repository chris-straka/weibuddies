import express, { Request, Response } from 'express';
import { product_db } from '../models/Product';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response) => {
  const products = await product_db.getProduct("TODO");
  return res.send(products);
});

export { router as indexProductRouter };