import { Pool } from 'pg';
import { IProductDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IProductDatabase = {
  getProduct(productId) {
    return pg
      .query({
        name: 'getProduct',
        text: 'SELECT * FROM products WHERE id = $1;',
        values: [productId],
      })
      .then((data) => data.rows[0]);
  },
  createProduct(productId, title, price) {
    return pg
      .query({
        name: 'createProduct',
        text: 'INSERT INTO products (id, title, price) VALUES ($1, $2, $3);',
        values: [productId, title, price],
      })
      .then(() => null);
  },
  updateProduct(productId, title, price) {
    return pg
      .query({
        name: 'updateProduct',
        text: 'UPDATE products SET title = $2, price = $3 WHERE id = $1;',
        values: [productId, title, price],
      })
      .then(() => null);
  },
};
