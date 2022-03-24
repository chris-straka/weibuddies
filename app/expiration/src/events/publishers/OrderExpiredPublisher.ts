import { Topic, AbstractPublisher, IExpirationComplete } from '@weibuddies/common';

export class OrderExpiredPublisher extends AbstractPublisher<IExpirationComplete> {
  topic: Topic.ExpirationComplete = Topic.ExpirationComplete;
}
