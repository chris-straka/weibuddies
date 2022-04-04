export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  userId: string;
  orderId: string;
  version: number;
  description: string;
  date_created: Date;
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
}
