import { AbstractPublisher, Subjects, IPaymentCreated } from '@weibuddies/common';

export class PaymentCreatedPublisher extends AbstractPublisher<IPaymentCreated> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
