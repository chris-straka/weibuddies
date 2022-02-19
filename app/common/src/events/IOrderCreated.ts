import { Subjects } from './Subjects';
import { OrderStatus } from './types/OrderStatus';

export interface IOrderCreated {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    product: {
      id: string;
      price: number;
    };
  };
}
