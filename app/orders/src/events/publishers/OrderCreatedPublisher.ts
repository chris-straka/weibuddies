import { AbstractPublisher, IOrderCreated, Subjects } from '@weibuddies/common';

export class OrderCreatedPublisher extends AbstractPublisher<IOrderCreated> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
