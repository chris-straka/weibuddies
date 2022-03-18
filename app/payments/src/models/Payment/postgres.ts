import { Pool } from 'pg';
import { IPaymentDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IPaymentDatabase = {
  async createPayment(orderId: string, paymentId: string) {
    const query = {
      name: 'create-payment',
      text: 'INSERT INTO payments VALUES ($1, $2);',
      values: [orderId, paymentId],
    };
    try {
      return await pg.query(query).then((response) => response.rows[0]);
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
