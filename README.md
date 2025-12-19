# Pulse (pulse-ts)

![Pulse Logo](docs/pulse.png)

Pulse is a tiny, developer-friendly TypeScript-first event emitter with a minimal,
well-typed API for both quick untyped usage and production-grade TypeScript
event maps.

Install

```bash
# npm
npm install pulse-ts

# yarn
yarn add pulse-ts

# pnpm
pnpm add pulse-ts
```

Known example — counterPulse

```ts
import { createPulse } from 'pulse-ts';

export const counterPulse = createPulse();

counterPulse.on('counter:incremented', (counter) => {
  console.log(`Counter: ${counter.count}`);

  if (counter.count >= 10) {
    console.log('Reached 10, unsubscribing');
    counterPulse.unsubscribe('counter:incremented');
  }
});
```

Quick examples

- one-time listener (auto-unsubscribe after first emit)

```ts
const p = createPulse<{ 'ready': void }>();
p.once('ready', () => console.log('ready fired once'));
await p.emit('ready', undefined);
```

- clear all listeners

```ts
p.clear();
```

API

- createPulse<E>() — create a typed Pulse instance
  - p.on(event, handler) — register a handler; returns an unsubscribe function for that handler
  - p.once(event, handler) — register a handler that is removed automatically after first emit
  - p.off(event, handler) — remove a specific handler
  - p.unsubscribe(event) — remove all handlers for an event
  - p.offAll(event) — alias for unsubscribe(event)
  - p.clear() — remove all handlers across all events
  - p.emit(event, payload) — emit an event; handlers may be async
- pulse — default untyped singleton for quick use
- defineEvent(name, handler) — register handler and return an unsubscribe function
- createListener(pulse, handlers) — register multiple handlers and return { off() }
- Types: EventMap, HandlerFor — helpers for typing handlers

Notes

- Emissions are async-friendly; handlers can return promises.
- Small, dependency-free, and focused on type safety and ergonomics.

Contributing

PRs and issues welcome. Run tests and follow existing project formatting.

[MIT LICENSE](LICENSE)
