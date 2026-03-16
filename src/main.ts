import { OrderManager } from "./Observable";
import { EmailNotification, InventoryUpdater } from "./Observer";
import type { Order } from "./Order";

const orderManager = new OrderManager();

const emailNotifier = new EmailNotification();
const inventoryUpdater = new InventoryUpdater();

orderManager.subscribe(emailNotifier);
orderManager.subscribe(inventoryUpdater);

const order: Order = {
  id: "A-1001",
  status: "pending",
  items: [
    { name: "Teclado", quantity: 1, price: 39.99 },
    { name: "Raton", quantity: 2, price: 19.5 },
  ],
};

console.log("Registrando pedido...");
orderManager.addOrder(order);

console.log("Actualizando estado a confirmed...");
orderManager.updateStatus("A-1001", "confirmed");

console.log("Intentando registrar un pedido duplicado...");
try {
  orderManager.addOrder(order);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
