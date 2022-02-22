import { AbstractPublisher, IOrderCancelled, Subjects } from '@weibuddies/common';

export class OrderCancelledPublisher extends AbstractPublisher<IOrderCancelled> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
