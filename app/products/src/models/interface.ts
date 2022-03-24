export interface Product {
  id: string;
  title: string;
  price: number;
  userId: string;
  orderId: string;
  version: number;
  date_created: Date;
}

export interface IProductDatabase {
  getProduct: (productId: string) => Promise<Product>;
  getProductsFromLowerToUpper: (lowerBound: string, upperBound: string) => Promise<Product[]>;
  createProduct: (title: string, price: number, userId: string) => Promise<Product>;
  removeProduct: (productId: string) => Promise<Product>;
  updateProduct: (title: string, price: number) => Promise<Product>;
  setOrderIdForProduct: (productId: string, newOrderId: string | null) => Promise<void>;
}
