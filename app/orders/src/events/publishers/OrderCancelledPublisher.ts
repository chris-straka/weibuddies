import { AbstractPublisher, IOrderCancelled, Topic } from '@weibuddies/common';

export class OrderCancelledPublisher extends AbstractPublisher<IOrderCancelled> {
  topic: Topic.OrderCancelled = Topic.OrderCancelled;
}
