import type { Observer } from "./Observer";
import type { Order, OrderStatus } from "./Order";

/**
 * @interface Observable define el contrato para la clase que gestionará los pedidos y notificará a los observadores sobre los cambios en los pedidos.
 * @class OrderManager implementa la interfaz Observable y se encarga de gestionar los pedidos, mantener una lista de observadores y notificarles sobre los cambios en los pedidos.
 * - subscribe(observer: Observer): void: Permite a un observador suscribirse para recibir notificaciones.
 * - unsubscribe(observer: Observer): void: Permite a un observador cancelar su suscripción.
 * - notify(order: Order): void: Notifica a todos los observadores sobre un cambio en un pedido.
 * - addOrder(order: Order): void: Agrega un nuevo pedido y notifica a los observadores.
 * - getOrder(id: string): Order | undefined: Recupera un pedido por su ID.
 * - updateStatus(id: string, status: OrderStatus): void: Actualiza el estado de un pedido y notifica a los observadores.
 */
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
