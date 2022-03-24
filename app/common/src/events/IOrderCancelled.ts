import { Topic } from './Topics';

export interface IOrderCancelled {
  topic: Topic.OrderCancelled;
  data: {
    id: string;
    version: number;
    productId: string;
  };
}
