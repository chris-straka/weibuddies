import { Pool } from 'pg';
import { IPaymentDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IPaymentDatabase = {
  createPayment(orderId, paymentId) {
    return pg
      .query({
        name: 'createPayment',
        text: 'INSERT INTO payments(order_id, payment_id) VALUES ($1, $2) RETURNING *;',
        values: [orderId, paymentId],
      })
      .then((response) => response.rows[0]);
  },
};
