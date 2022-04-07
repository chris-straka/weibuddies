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

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  productId: string;
  productTitle: string;
  productPrice: number;
  version: number;
}

export declare enum OrderStatus {
  Created = "created",
  Cancelled = "cancelled",
  Expired = "expired",
  AwaitingPayment = "awaiting:payment",
  Complete = "complete",
}
