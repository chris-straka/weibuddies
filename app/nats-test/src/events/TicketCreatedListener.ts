import { AbstractListener, IProductCreated, Subjects } from '@weibuddies/common';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListener extends AbstractListener<
  IProductCreated
> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = 'payments-service';

  onMessage(data: IProductCreated['data'], msg: Message) {
    console.log('Event data! ', data);
    msg.ack();
  }
}
