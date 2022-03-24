import { Pool } from 'pg';
import { IProductDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IProductDatabase = {
  getProduct(id) {
    return pg
      .query({
        name: 'getProduct',
        text: 'SELECT * FROM products WHERE id = $1;',
        values: [id],
      })
      .then((data) => data.rows[0]);
  },
  createProduct(title, price) {
    return pg
      .query({
        name: 'create-product',
        text: 'INSERT INTO products VALUES ($1, $2);',
        values: [title, price],
      })
      .then((data) => data.rows[0]);
  },
  updateProduct(id, title, price) {
    return pg
      .query({
        name: 'createProduct',
        text: 'UPDATE products SET title = $2, price = $3 WHERE id = $1;',
        values: [id, title, price],
      })
      .then((data) => data.rows[0]);
  },
};
