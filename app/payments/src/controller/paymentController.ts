import {
  NotFoundError,
  NotAuthorizedError,
  BadRequestError,
  OrderStatus,
} from '@weibuddies/common';
import { Request, Response, NextFunction } from 'express';
import { orderDb } from 'models/Order/Order';
import { paymentDb } from 'models/Payment/Payment';
import { producer } from 'kafka';
import Stripe from 'stripe';

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, orderId } = req.body;
    const stripe = new Stripe(process.env.STRIPE_KEY!, { apiVersion: '2020-08-27' });

    const order = await orderDb.getOrder(orderId);
    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    if (order.status === OrderStatus.Cancelled)
      throw new BadRequestError('The order has already been cancelled');

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: +order.price * 100,
      source: token,
    });

    const payment = await paymentDb.createPayment(order.id, charge.id);

    producer.send({
      topic: 'payments',
      messages: [
        { key: 'paymentId', value: payment.id },
        { key: 'orderId', value: order.id },
        { key: 'stripeId', value: charge.id },
      ],
    });

    return res.status(201).send({ id: payment.id });
  } catch (error) {
    return next(error);
  }
};
