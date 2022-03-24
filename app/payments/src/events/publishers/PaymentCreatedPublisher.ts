import { Topic, AbstractPublisher, IPaymentCreated } from '@weibuddies/common';

export class PaymentCreatedPublisher extends AbstractPublisher<IPaymentCreated> {
  topic: Topic.PaymentCreated = Topic.PaymentCreated;
}
