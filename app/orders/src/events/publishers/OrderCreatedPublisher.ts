import { AbstractPublisher, IOrderCreated, Topic } from '@weibuddies/common';

export class OrderCreatedPublisher extends AbstractPublisher<IOrderCreated> {
  topic: Topic.OrderCreated = Topic.OrderCreated;
}
