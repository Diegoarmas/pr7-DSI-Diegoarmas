import type { Order } from "./Order";

export interface Observer {
  update(order: Order): void;
}

/**
 * @class EmailNotification implementa la interfaz Observer y se encarga de enviar notificaciones por correo electrónico a los clientes cuando el estado de su pedido cambia.
 * @class InventoryUpdater implementa la interfaz Observer y se encarga de actualizar el inventario cada vez que se recibe un nuevo pedido.
 */
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
