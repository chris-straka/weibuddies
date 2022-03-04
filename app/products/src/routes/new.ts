import { requireAuth, validateRequest } from "@weibuddies/common"
import { ProductCreatedPublisher } from '../events/publishers/ProductCreatedPublisher'
import { Router, Request, Response } from "express"
import { body } from "express-validator"
import { product_db } from "../models/Product"
import { natsWrapper } from "../KafkaWrapper"

const router = Router()

router.post(
  '/api/products',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage("Price must be > 0")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body
    const product = product_db.createProduct("TODO")
    await new ProductCreatedPublisher(natsWrapper.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version,
    })
    return res.status(201).send(product)
  }
)

export { router as createProductRouter }