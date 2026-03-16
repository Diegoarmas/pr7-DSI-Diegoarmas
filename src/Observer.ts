import type { Order } from "./Order";

export interface Observer {
  update(order: Order): void;
}

export class EmailNotification implements Observer {
  update(order: Order): void {
    console.log(
      "Su pedido con id " +
        order.id +
        " ha sido actualizado a estado: " +
        order.status,
    );
  }
}

export class InventoryUpdater implements Observer {
  update(order: Order): void {
    console.log("Nuevo pedido con id " + order.id + " recibido.");
  }
}
