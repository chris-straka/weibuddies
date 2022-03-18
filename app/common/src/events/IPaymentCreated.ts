import { Subjects } from './Subjects';

export interface IPaymentCreated {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
