import { Request, Response } from "express"
import { NotFoundError, NotAuthorizedError, BadRequestError, OrderStatus } from "@weibuddies/common";
import { order_db } from "models/Order/Order";
import { payment_db } from "models/Payment/Payment";
import Stripe from 'stripe';

export const createPayment = async (req: Request, res: Response) => {
  if (!process.env.STRIPE_KEY) throw new Error('[Payments] Can\'t find the STRIPE_KEY')

  const { token, orderId } = req.body;
  const order = await order_db.getOrder(orderId);

  if (!order) throw new NotFoundError();
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
  if (order.status === OrderStatus.Cancelled) throw new BadRequestError('[Payments] Cannot pay for a cancelled order');

  const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: '2020-08-27', });

  const charge = await stripe.charges.create({
    currency: 'usd',
    amount: order.price * 100,
    source: token,
  });

  // id, orderId, stripeId
  const payment = payment_db.createPayment("TODO", "TODO")

  // TODO
  // Fire off an event 

  return res.status(201).send({ id: payment.id });
}