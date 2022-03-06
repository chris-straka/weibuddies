import { requireAuth, validateRequest } from "@weibuddies/common"
import { Router } from "express"
import { body } from "express-validator"
import { createProduct } from "../controller/productController"

const router = Router()

router.post(
  '/api/products',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage("Price must be > 0")
  ],
  validateRequest,
  createProduct
)

export { router as createProductRouter }