import { Pool } from 'pg';
import { IPaymentDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IPaymentDatabase = {
  createPayment(orderId, paymentId) {
    return pg
      .query({
        name: 'create-payment',
        text: 'INSERT INTO payments VALUES ($1, $2);',
        values: [orderId, paymentId],
      })
      .then((response) => response.rows[0]);
  },
};
