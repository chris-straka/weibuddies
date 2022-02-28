import { BadRequestError, OrderStatus, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@weibuddies/common';
import { PaymentCreatedPublisher } from 'events/publishers/PaymentCreatedPublisher';
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/Order/Order';
import { Payment } from '../models/Payment/Payment';
import { natsWrapper } from 'NatsWrapper';
import { stripe } from 'stripeApp';

const router = Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.getOrder(orderId);

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    if (order.status === OrderStatus.Cancelled) throw new BadRequestError('[Payments] Cannot pay for a cancelled order');

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    return res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
