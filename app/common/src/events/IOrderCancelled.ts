import { Subjects } from './Subjects';

export interface IOrderCancelled {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number;
    product: {
      id: string;
    };
  };
}
