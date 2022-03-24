import { Pool } from 'pg';
import { IProductDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IProductDatabase = {
  getProduct(productId) {
    return pg
      .query({
        name: 'getProduct',
        text: 'SELECT * FROM orders WHERE id = $1;',
        values: [productId],
      })
      .then((data) => data.rows[0]);
  },
  getProductsFromLowerToUpper(lowerBound, upperBound) {
    return pg
      .query({
        name: 'getProductsFromPage',
        text: 'SELECT * FROM orders ORDER BY date_created DESC OFFSET $1 LIMIT $2;',
        values: [lowerBound, upperBound],
      })
      .then((data) => data.rows);
  },
  createProduct(title, price, userId) {
    return pg
      .query({
        name: 'createProduct',
        text: 'INSERT INTO products(title, price, userId) VALUES ($1, $2, $3) RETURNING *;',
        values: [title, price, userId],
      })
      .then((data) => data.rows[0]);
  },
  updateProduct(title, price) {
    return pg
      .query({
        name: 'updateProduct',
        text: 'UPDATE products SET title = $1 AND price = $2 RETURNING *;',
        values: [title, price],
      })
      .then((data) => data.rows[0]);
  },
  removeProduct(productId) {
    return pg
      .query({
        name: 'removeProduct',
        text: 'DELETE FROM products WHERE id = $1 RETURNING *;',
        values: [productId],
      })
      .then((data) => data.rows[0]);
  },
  setOrderIdForProduct(productId, newOrderId) {
    return pg
      .query({
        name: 'removeOrderIdFromProduct',
        text: 'UPDATE products SET order_id = $2 WHERE id = $1;',
        values: [productId, newOrderId],
      })
      .then((data) => data.rows[0]);
  },
};
