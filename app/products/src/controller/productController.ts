import { Request, Response } from "express"
import { NotFoundError, BadRequestError, NotAuthorizedError } from "@weibuddies/common"
import { product_db } from "../models/Product"

export const getProduct = async (req: Request, res: Response) => {
  // const product = await product_db.getProduct(req.params.id);
  // if (!product) throw new NotFoundError();
  // return res.status(200).send(product);
}

export const createProduct = async (req: Request, res: Response) => {
  // const { title, price } = req.body
  // const product = product_db.createProduct("TODO")

  // // TODO
  // // Fire off an event creating a product (id, title, price, userId, version)

  // return res.status(201).send(product)
}

export const updateProduct = async (req: Request, res: Response) => {
  // const product = await product_db.getProduct(req.params.id);

  // if (!product) throw new NotFoundError();
  // if (product.orderId) throw new BadRequestError('[Orders] Cannot edit a reserved product');
  // if (product.userId !== req.currentUser!.id) throw new NotAuthorizedError()

  // product_db.setProduct(req.body.title, req.body.price)

  // // TODO
  // // Fire off an event that updates the product (id, title, price, userId, version)

  // return res.status(200).send(product);
}