import { AbstractPublisher, Topic, IProductCreated } from '@weibuddies/common';

export class ProductCreatedPublisher extends AbstractPublisher<IProductCreated> {
  topic: Topic.ProductCreated = Topic.ProductCreated;
}
