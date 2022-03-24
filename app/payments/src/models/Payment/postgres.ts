import { Pool } from 'pg';
import { IPaymentDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IPaymentDatabase = {
  createPayment(orderId, paymentId) {
    return pg
      .query({
        name: 'createPayment',
        text: 'INSERT INTO payments(order) VALUES ($1, $2);',
        values: [orderId, paymentId],
      })
      .then((response) => response.rows[0]);
  },
};
