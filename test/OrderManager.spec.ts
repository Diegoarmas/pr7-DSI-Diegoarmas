import { OrderManager } from "../src/Observable";
import { EmailNotification, InventoryUpdater } from "../src/Observer";
import { describe, it, beforeEach, expect } from "vitest";

describe("OrderManager", () => {
  let orderManager: OrderManager;
  let emailNotifier: EmailNotification;
  let inventoryUpdater: InventoryUpdater;

  beforeEach(() => {
    orderManager = new OrderManager();
    emailNotifier = new EmailNotification();
    inventoryUpdater = new InventoryUpdater();

    orderManager.subscribe(emailNotifier);
    orderManager.subscribe(inventoryUpdater);
  });

  const order1 = {
    id: "A-1001",
    status: "pending",
    items: [
      { name: "Teclado", quantity: 1, price: 39.99 },
      { name: "Raton", quantity: 2, price: 19.5 },
    ],
  };

  it("should add a new order and notify observers", () => {
    orderManager.addOrder(order1);
    const retrievedOrder = orderManager.getOrder("A-1001");

    expect(retrievedOrder).toEqual(order1);
  });

  it("Debe tirar error si id de pedido ya existe", () => {
    orderManager.addOrder(order1);
    const order2 = order1;
    expect(() => orderManager.addOrder(order2)).toThrowError(
      `El pedido con id ${order2.id} ya existe`,
    );
  });

  it("unsuscribe debe eliminar al observador", () => {
    orderManager.unsubscribe(emailNotifier);
    orderManager.addOrder(order1);
    const retrievedOrder = orderManager.getOrder("A-1001");

    expect(retrievedOrder).toEqual(order1);
  });

  it("updateStatus debe actualizar el estado del pedido y notificar a los observadores", () => {
    orderManager.addOrder(order1);
    orderManager.updateStatus("A-1001", "confirmed");
    const updatedOrder = orderManager.getOrder("A-1001");

    expect(updatedOrder?.status).toBe("confirmed");
  });

  it("updateStatus debe tirar error si el pedido no existe", () => {
    expect(() =>
      orderManager.updateStatus("non-existent-id", "shipped"),
    ).toThrowError(`No se encontró el pedido con id non-existent-id`);
  });
});
