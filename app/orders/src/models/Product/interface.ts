export interface Product {
  id: string;
  title: string;
  price: number;
  status: string;
}

export interface IProductDatabase {
  getProduct: (productId: string) => Promise<Product>;
  createProduct: (productId: string, title: string, price: number) => Promise<null>;
  updateProduct: (productId: string, title: string, price: number) => Promise<null>;
}
