import { Subjects } from './Subjects';

export interface IProductUpdated {
  subject: Subjects.ProductUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
