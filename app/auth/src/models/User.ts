import { postgresDb } from './postgres';
import { IUserDatabase } from './interface';
import { Password } from '../services/password';

const UserDatabase = (db: IUserDatabase): IUserDatabase => ({
  getUser(email) {
    return db.getUser(email);
  },
  async createUser(email, password) {
    const hashedPassword = await Password.toHash(password);
    return db.createUser(email, hashedPassword);
  },
});

export const userDb = UserDatabase(postgresDb);
