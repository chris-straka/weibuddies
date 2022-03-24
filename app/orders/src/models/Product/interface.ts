export interface Product {
  id: string;
  title: string;
  price: string;
  isReserved(): Promise<boolean>;
}

// createProduct() takes an id because 'orders' doesn't create products itself
// It receives products from 'products'.
export interface IProductDatabase {
  getProduct: (id: string) => Promise<Product>;
  createProduct: (id: string, title: string, price: number) => Promise<void>;
  updateProduct: (id: string, title: string, price: number) => Promise<void>;
}
