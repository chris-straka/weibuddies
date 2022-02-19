export interface Product {
  id: number,
  title: string,
  price: string,
  userId: string,
  orderId: string
}

export interface ProductDatabase {
  getProduct: (id: string) => Product,  
  createProduct: (userId: string) => Product
}