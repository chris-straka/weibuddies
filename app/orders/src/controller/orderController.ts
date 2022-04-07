import {
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
  BadRequestError,
} from '@weibuddies/common';
import { Request, Response, NextFunction } from 'express';
import { orderDb } from '../models/Order/Order';
import { productDb } from '../models/Product/Product';
import { OrderCreatedPublisher } from '../events/publishers/OrderCreatedPublisher';
import { OrderCancelledPublisher } from '../events/publishers/OrderCancelledPublisher';
import { producer } from '../kafka';

const EXPIRATION_WINDOW_SECONDS = 60 * 60 * 24;

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderDb.getOrder(req.params.orderId);
    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    return res.send(order);
  } catch (error) {
    return next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser) throw new Error('Not logged in');
    const orders = await orderDb.getOrders(req.currentUser.id);

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

    if (
      product.status === OrderStatus.Created ||
      OrderStatus.AwaitingPayment ||
      OrderStatus.Complete
    )
      throw new BadRequestError('Product is already reserved');

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = await orderDb.createOrder(userId, OrderStatus.Created, expiration, product.id);

    new OrderCreatedPublisher(producer).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      product: {
        id: product.id,
        price: product.price,
      },
    });

    return res.status(201).send(order);
  } catch (error) {
    return next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderDb.getOrder(req.params.orderId);

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    await orderDb.setOrderStatus(req.params.orderId, OrderStatus.Cancelled);

    new OrderCancelledPublisher(producer).publish({
      id: order.id,
      version: order.version,
      productId: order.productId,
    });

    return res.status(204).send(order);
  } catch (error) {
    return next(error);
  }
};
