import { postgresDb } from './postgres';
import { IUserDatabase } from './interface';
import { Password } from '../services/password';

const UserDatabase = (db: IUserDatabase): IUserDatabase => ({
  async getUser(email: string) {
    return db.getUser(email);
  },
  async createUser(email: string, password: string) {
    const hashedPassword = await Password.toHash(password);
    return db.createUser(email, hashedPassword);
  },
});

export const userDb = UserDatabase(postgresDb);
