import {
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
  BadRequestError,
} from '@weibuddies/common';
import { Request, Response, NextFunction } from 'express';
import { orderDb } from '../models/Order/Order';
import { productDb } from '../models/Product/Product';
import { producer } from '../events/kafka';

const EXPIRATION_WINDOW_SECONDS = 60 * 15;

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // I have to join this with the product
    const order = await orderDb.getOrder(req.params.orderId);
    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    return res.status(200).send(order);
  } catch (error) {
    return next(error);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  if (!req.currentUser) throw new Error('Not logged in');

  // I have to join this with the products
  const orders = await orderDb.getAllOrders(req.currentUser.id);

  return res.send(orders);
};

export const newOrder = async (req: Request, res: Response) => {
  if (!req.currentUser) throw new Error('User not logged in');
  const { productId } = req.body;
  const { id: userId } = req.currentUser;
  const product = await productDb.getProduct(productId);
  if (!product) throw new NotFoundError();

  const isReserved = await product.isReserved();
  if (isReserved) throw new BadRequestError('Ticket is already reserved');

  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  const order = await orderDb.createOrder(userId, OrderStatus.Created, expiration, product.id);

  producer.send({
    topic: 'orders',
    messages: [
      { key: 'productId', value: order.id },
      { key: 'status', value: order.status },
      { key: 'userId', value: order.userId },
      { key: 'productId', value: order.productId },
      { key: 'version', value: order.version },
    ],
  });

  return res.status(201).send(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const order = await orderDb.getOrder(req.params.orderId);

  if (!order) throw new NotFoundError();
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = OrderStatus.Cancelled;

  // Publish an event saying the order is cancelled

  return res.status(204).send(order);
};
