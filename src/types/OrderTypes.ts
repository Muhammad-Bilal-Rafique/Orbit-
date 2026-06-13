export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  _id: string;
  color: string;
  size: string;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string | null; 
  zip: string;
  country: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderType {
  _id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  stripeSessionId: string;
  isReviewed: boolean;
  createdAt: string; 
  updatedAt: string;
  __v?: number; 
}