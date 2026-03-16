import type { Observer } from "./Observer";
import type { Order, OrderStatus } from "./Order";

export interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(order: Order): void;
}

export class OrderManager implements Observable {
  private observers: Observer[] = [];
  private orders: Order[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(order: Order): void {
    for (const observer of this.observers) {
      observer.update(order);
    }
  }

  addOrder(order: Order): void {
    const exists = this.orders.some(
      (currentOrder) => currentOrder.id === order.id,
    );

    if (exists) {
      throw new Error(`El pedido con id ${order.id} ya existe`);
    }

    this.orders.push(order);
    this.notify(order);
  }

  getOrder(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  updateStatus(id: string, status: OrderStatus): void {
    const order = this.getOrder(id);
    if (!order) {
      throw new Error(`No se encontró el pedido con id ${id}`);
    }
    order.status = status;
    this.notify(order);
  }
}
