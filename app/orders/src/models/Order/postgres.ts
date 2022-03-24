import { Pool } from 'pg';
import { IOrderDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IOrderDatabase = {
  getOrder(id) {
    return pg
      .query({
        name: 'getOrder',
        text: `
            SELECT * FROM orders 
            LEFT JOIN products 
            ON orders.product_id = products.id 
            WHERE orders.product_id = $1;
        `,
        values: [id],
      })
      .then((data) => data.rows[0]);
  },
  getOrders() {
    return pg
      .query({
        name: 'getOrders',
        text: `
            SELECT * FROM orders 
            LEFT JOIN products 
            ON orders.product_id = products.id;
          `,
      })
      .then((data) => data.rows[0]);
  },
  setOrderStatus(id, newStatus) {
    return pg
      .query({
        name: 'setOrderStatus',
        text: `UPDATE orders SET status = $2 WHERE id = $1;`,
        values: [id, newStatus],
      })
      .then((data) => data.rows[0]);
  },
  createOrder(userId, status, expiresAt, productId) {
    return pg
      .query({
        name: 'createOrder',
        text: `
          SELECT 
            products.price, 
            products.id, 
            (INSERT INTO orders(user_id, order_status, expires_at, product_id) VALUES ($1, $2, $3, $4) RETURNING *) 
          FROM products;
        `,
        values: [userId, status, expiresAt, productId],
      })
      .then((response) => response.rows[0]);
  },
};
