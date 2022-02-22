import { BadRequestError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@weibuddies/common';
import { ProductUpdatedPublisher } from "../events/publishers/ProductUpdatedPublisher";
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { product_db } from '../models/Product';
import { natsWrapper } from '../NatsWrapper';

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
  async (req: Request, res: Response) => {
    const product = await product_db.getProduct(req.params.id);

    if (!product) throw new NotFoundError();
    if (product.orderId) throw new BadRequestError('[Orders] Cannot edit a reserved product');
    if (product.userId !== req.currentUser!.id) throw new NotAuthorizedError()

    product_db.setProduct(req.body.title, req.body.price)

    new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version,
    });

    return res.status(200).send(product);
  }
);

export { router as updateProductRouter };
