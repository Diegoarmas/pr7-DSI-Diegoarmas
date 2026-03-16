export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
}
