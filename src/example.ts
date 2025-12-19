import { defineEvent, createPulse, pulse } from "./core/emitter";
import { createListener } from "./core/listner";

// Quick untyped usage (convenience)
const unsubscribe = defineEvent("user:created", async (payload) => {
  console.log("(untyped) User created:", payload);
});

void (async () => {
  await pulse.emit("user:created", { id: 1, name: "Alice" });
  unsubscribe();
})();

// Strongly-typed usage: define an EventMap and create a typed pulse
type MyEvents = {
  "user:created": { id: number; name: string };
  "order:placed": { orderId: string; total: number };
};

const typedPulse = createPulse<MyEvents>();

typedPulse.on("user:created", async (p) => {
  console.log("(typed) user created -> id", p.id, "name", p.name);
});

void (async () => {
  await typedPulse.emit("user:created", { id: 42, name: "Bob" });
})();

// Use createListener to group multiple handlers and unsubscribe together
const listener = createListener(typedPulse, {
  "order:placed": (o) => {
    console.log("(listener) order placed:", o.orderId, "total", o.total);
  },
});

void (async () => {
  await typedPulse.emit("order:placed", { orderId: "abc-123", total: 99.5 });
  // unsubscribe all listener handlers
  listener.off();
})();

export {};
