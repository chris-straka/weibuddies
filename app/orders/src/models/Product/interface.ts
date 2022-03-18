export interface Product {
  id: string
  title: string
  price: string
  isReserved(): Promise<boolean>
}

export interface IProductDatabase {
  getProduct: (id: string) => Promise<Product>
  createProduct: (title: string, price: string) => Promise<Product>
}
