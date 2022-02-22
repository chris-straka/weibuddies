export interface Product {
  id: string,
  title: string,
  price: number,
  userId: string,
  orderId: string,
  version: number
}

export interface ProductDatabase {
  getProduct: (id: string) => any,  
  createProduct: (userId: string) => any,
  removeProduct: (productId: string) => any,
  setProduct: (title: string, price: string) => any
}