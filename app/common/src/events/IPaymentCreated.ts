import { Topic } from './Topics';

export interface IPaymentCreated {
  topic: Topic.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
