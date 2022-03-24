export interface User {
  id: number;
  email: string;
  password: string;
}

export interface IUserDatabase {
  getUser: (email: string) => Promise<User>;
  createUser: (email: string, password: string) => Promise<User>;
}
