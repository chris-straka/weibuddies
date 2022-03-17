import { Request, Response, NextFunction } from "express"
import { NotFoundError, NotAuthorizedError, BadRequestError, OrderStatus } from "@weibuddies/common";
import { order_db } from "models/Order/Order";
import { payment_db } from "models/Payment/Payment";
import Stripe from 'stripe';

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, orderId } = req.body;
    const stripe = new Stripe(process.env.STRIPE_KEY!, { apiVersion: '2020-08-27', });

    const order = await order_db.getOrder(orderId);
    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    if (order.status === OrderStatus.Cancelled) throw new BadRequestError('Cannot pay for a cancelled order');

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });

    // id, orderId, stripeId
    const payment = payment_db.createPayment(order.id, charge.id)

    // TODO
    // Fire off an event 

    return res.status(201).send({ id: payment.id });
  } catch (error) {
    next(error)
  }
}