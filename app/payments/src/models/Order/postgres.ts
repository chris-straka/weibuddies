import { Pool } from 'pg';
import { IOrderDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IOrderDatabase = {
  getOrder(id) {
    return pg
      .query({
        name: 'get-order',
        text: 'SELECT * FROM orders WHERE id = $1;',
        values: [id],
      })
      .then((data) => data.rows[0]);
  },
  createOrder(id, price, status, userId, version) {
    return pg
      .query({
        name: 'create-order',
        text: 'INSERT INTO orders VALUES ($1, $2, $3, $4);',
        values: [id, price, status, userId, version],
      })
      .then((response) => response.rows[0]);
  },
  setOrderStatus(orderId, newStatus) {
    return pg
      .query({
        name: 'remove-order',
        text: 'UPDATE orders SET order_status = $2 WHERE id = $1;',
        values: [orderId, newStatus],
      })
      .then((res) => res.rows[0]);
  },
};
