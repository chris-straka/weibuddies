export interface Product {
  id: string
  title: string
  price: string
  userId: string
  orderId: string
  version: string
  date_created: Date
}

export interface IProductDatabase {
  getProduct: (productId: string) => Promise<Product>
  getProductsFromLowerToUpper: (lowerBound: string, upperBound: string) => Promise<Product[]>
  createProduct: (title: string, price: string, userId: string) => Promise<Product>
  removeProduct: (productId: string) => Promise<Product>
  updateProduct: (title: string, price: string) => Promise<Product>
}
