import { AbstractPublisher, IOrderCreated, Topic } from '@weibuddies/common';

export class OrderCreatedListener extends AbstractPublisher<IOrderCreated> {
  topic: Topic.OrderCreated = Topic.OrderCreated;
}
