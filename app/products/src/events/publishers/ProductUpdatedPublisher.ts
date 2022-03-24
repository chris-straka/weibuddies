import { AbstractPublisher, Topic, IProductUpdated } from '@weibuddies/common';

export class ProductUpdatedPublisher extends AbstractPublisher<IProductUpdated> {
  topic: Topic.ProductUpdated = Topic.ProductUpdated;
}
