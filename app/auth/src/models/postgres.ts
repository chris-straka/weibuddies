import { Pool } from 'pg';
import { IUserDatabase } from './interface';

const pool = new Pool(); // pg uses env vars to connect to DB

export const postgresDb: IUserDatabase = {
  getUser(email) {
    return pool
      .query({
        name: 'getUser',
        text: 'SELECT * FROM users WHERE email = $1;',
        values: [email],
      })
      .then((data) => data.rows[0]);
  },
  createUser(email, password) {
    return pool
      .query({
        name: 'createUser',
        text: 'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *;',
        values: [email, password],
      })
      .then((data) => data.rows[0]);
  },
};
