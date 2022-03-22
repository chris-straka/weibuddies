import { Topic } from './Topics';

export interface IProductCreated {
  topic: Topic.ProductCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
