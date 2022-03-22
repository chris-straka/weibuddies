import { Topic } from './Topics';

export interface IExpirationComplete {
  topic: Topic.ExpirationComplete;
  data: {
    orderId: string;
  };
}
