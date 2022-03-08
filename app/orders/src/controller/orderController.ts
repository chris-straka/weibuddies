import { NotFoundError, NotAuthorizedError, OrderStatus } from "@weibuddies/common";
import { Request, Response } from "express"
import { order_db } from "../models/Order/Order";

export const deleteOrder = async (req: Request, res: Response) => {
  // const order = await order_db.getOrder("TODO")

  // if (!order) throw new NotFoundError();
  // if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  // order.status = OrderStatus.Cancelled;

  // Publish an event saying the order is cancelled
  // return res.status(204).send(order);
}

export const getOrders = async (req: Request, res: Response) => {
  // const orders = await Order.find({
  //   userId: req.currentUser!.id,
  // }).populate('ticket');

  // return res.send(orders);
}

export const newOrder = async (req: Request, res: Response) => {
  // const { productId } = req.body;
  // const product = await product_db.getProduct(productId)
  // if (!product) throw new NotFoundError();

  // const isReserved = await product.isReserved();
  // if (isReserved) throw new BadRequestError('Ticket is already reserved');

  // const expiration = new Date();
  // expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  // const order = Order.build({
  //   userId: req.currentUser!.id,
  //   status: OrderStatus.Created,
  //   expiresAt: expiration,
  //   product,
  // });

  // await order.save();

  // new OrderCreatedPublisher(natsWrapper.client).publish({
  //   id: order.id,
  //   version: order.version,
  //   status: order.status,
  //   userId: order.userId,
  //   expiresAt: order.expiresAt.toISOString(),
  //   product: {
  //     id: product.id,
  //     price: product.price,
  //   },
  // });

  // return res.status(201).send(order);
}

export const getOrder = async (req: Request, res: Response) => {
  // const order = await Order.findById(req.params.orderId).populate('ticket');
  // if (!order) throw new NotFoundError();
  // if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
  // return res.send(order);
}