import { Pool } from 'pg';
import { IProductDatabase } from './interface';

const pg = new Pool();

export const postgresDb: IProductDatabase = ({
  async getProduct(id: string) {
    const query = {
      name: 'get-product',
      text: 'SELECT * FROM orders WHERE id = $1;',
      values: [id],
    };
    try {
      return await pg.query(query).then((data) => data.rows[0]);
    } catch (error) {
      throw new Error(error as string);
    }
  },
  async createProduct(title: string, price: string) {
    const query = {
      name: 'create-product',
      text: 'INSERT INTO products VALUES ($1, $2, $3);',
      values: [title, price],
    };
    try {
      return await pg.query(query).then((data) => data.rows[0]);
    } catch (error) {
      throw new Error(error as string);
    }
  },
});
