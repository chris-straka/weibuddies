import { AbstractPublisher, IProductCreated, Subjects } from '@weibuddies/common';

export class TicketCreatedPublisher extends AbstractPublisher<IProductCreated> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
