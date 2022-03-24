import {
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
  BadRequestError,
} from '@weibuddies/common';
import { Request, Response, NextFunction } from 'express';
import { orderDb } from '../models/Order/Order';
import { productDb } from '../models/Product/Product';

const EXPIRATION_WINDOW_SECONDS = 60 * 15;

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderDb.getOrder(req.params.orderId);
    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    return res.status(200).send(order);
  } catch (error) {
    return next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser) throw new Error('Not logged in');
    const orders = await orderDb.getOrders();
    return res.send(orders);
  } catch (error) {
    return next(error);
  }
};

export const newOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser) throw new Error('User not logged in');

    const { productId } = req.body;
    const { id: userId } = req.currentUser;

    const product = await productDb.getProduct(productId);
    if (!product) throw new NotFoundError();

    const isReserved = await product.isReserved();
    if (isReserved) throw new BadRequestError('Ticket is already reserved');

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    await orderDb.createOrder(userId, OrderStatus.Created, expiration, product.id);

    // Fire off an event saying I created a new Order

    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderDb.getOrder(req.params.orderId);

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    order.status = OrderStatus.Cancelled;

    // Publish an event saying the order is cancelled

    return res.status(204).send(order);
  } catch (error) {
    return next(error);
  }
};
