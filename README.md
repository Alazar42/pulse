# Pulse

Tiny TypeScript event helper for defining and emitting custom events.

Quick features
- `defineEvent(name, handler)` — convenience register (returns unsubscribe).
- `createPulse<EventMap>()` — create a strongly-typed emitter instance.
- `pulse` — default untyped singleton for quick use.
- `createListener(pulse, handlers)` — register grouped handlers and `off()`.

Files
- [src/core/emitter.ts](src/core/emitter.ts) — `Pulse` implementation and helpers
- [src/core/types.ts](src/core/types.ts) — shared types (`EventMap`, `HandlerFor`)
- [src/core/listner.ts](src/core/listner.ts) — `createListener` helper
- [src/example.ts](src/example.ts) — usage examples

Usage

1) Quick untyped (convenience)

```ts
import { defineEvent, pulse } from './core/emitter';

const unsub = defineEvent('user:created', async (p) => {
  console.log('User created', p);
});

await pulse.emit('user:created', { id: 1, name: 'Alice' });
unsub();
```

2) Strongly-typed

```ts
import { createPulse } from './core/emitter';

type MyEvents = {
  'user:created': { id: number; name: string };
  'order:placed': { orderId: string; total: number };
};

const p = createPulse<MyEvents>();

p.on('user:created', (payload) => {
  // payload is typed: { id: number; name: string }
  console.log(payload.id, payload.name);
});

await p.emit('user:created', { id: 42, name: 'Bob' });
```

3) Grouped listeners

```ts
import { createListener } from './core/listner';

const listener = createListener(p, {
  'order:placed': (o) => console.log('order', o.orderId, o.total),
});

// later
listener.off();
```

Build & run

Install deps and run dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Questions or next steps
- Add unit tests (Vitest) and a small publish-ready package.json? Open to doing that next.
