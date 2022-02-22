import { NotFoundError } from "@weibuddies/common"
import { Router, Request, Response } from 'express';
import { product_db } from '../models/Product';

const router = Router();

router.get('/api/products/:id', async (req: Request, res: Response) => {
  const product = await product_db.getProduct(req.params.id);
  if (!product) throw new NotFoundError();
  return res.status(200).send(product);
});

export { router as showProductRouter };