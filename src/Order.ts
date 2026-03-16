export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

/**
 * @interface OrderItem define la estructura de un artículo en un pedido, incluyendo su nombre, cantidad y precio.
 */
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}


/**
 * @interface Order define la estructura de un pedido, incluyendo su ID, estado y una lista de artículos.
 */
export interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
}
