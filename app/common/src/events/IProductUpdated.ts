import { Topic } from './Topics';

export interface IProductUpdated {
  topic: Topic.ProductUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
