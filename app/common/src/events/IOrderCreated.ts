import { Topic } from './Topics';
import { OrderStatus } from './types/OrderStatus';

export interface IOrderCreated {
  topic: Topic.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    product: {
      id: string;
      price: number;
    }
  };
}
