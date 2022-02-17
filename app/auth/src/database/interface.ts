export interface User {
  id: number,
  email: string,
  password: string
}

export interface Database {
  getUser: (email: string) => User,  
  createUser: (email: string, password: string) => User
}