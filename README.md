 # Pulse (pulse-ts)

  Pulse is a tiny, developer-friendly TypeScript-first event emitter. It focuses on
  providing a clear API for both quick untyped usage and strongly-typed event
  maps for production-grade TypeScript projects.

  Install

  ```bash
  npm install pulse-ts
  ```

  Quick start (developer-focused)

  ```ts
  import { pulse, defineEvent, createPulse, createListener } from 'pulse-ts';

  // Convenience (untyped)
  const unsub = defineEvent('user:created', (payload) => console.log('user', payload));
  await pulse.emit('user:created', { id: 1, name: 'Alice' });
  unsub();

  // Strongly-typed event map
  type MyEvents = {
    'user:created': { id: number; name: string };
    'order:placed': { orderId: string; total: number };
  };

  const p = createPulse<MyEvents>();
  p.on('user:created', (u) => console.log(u.id, u.name));
  await p.emit('user:created', { id: 42, name: 'Bob' });

  // Group and remove listeners together
  const listener = createListener(p, {
    'order:placed': (o) => console.log('order', o.orderId, o.total),
  });
  await p.emit('order:placed', { orderId: 'abc-1', total: 99.5 });
  listener.off();
  ```

  Module exports

  Public API is exported from the package entry:

  - `createPulse` — make a typed emitter instance
  - `pulse` — default untyped singleton (convenience)
  - `defineEvent` — quick registration + unsubscribe
  - `createListener` — register grouped handlers and `off()`
  - `EventMap`, `HandlerFor` — useful type helpers
