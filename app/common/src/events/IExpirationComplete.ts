import { Subjects } from './Subjects';

export interface IExpirationComplete {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
