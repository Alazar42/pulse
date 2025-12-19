import {
  type EventMap,
  type HandlerFor,
  type EventHandler,
  type EventPayload,
  type EventName,
} from "./types";

export class Pulse<EM extends EventMap = Record<string, EventPayload>> {
  private handlers: Map<string, Set<Function>> = new Map();

  constructor() {}

  on<K extends keyof EM & string>(event: K, handler: HandlerFor<EM, K>) {
    let set = this.handlers.get(event);
    if (!set) {
      set = new Set();
      this.handlers.set(event, set);
    }
    set.add(handler as Function);
    return () => this.off(event, handler as any);
  }

  off<K extends keyof EM & string>(event: K, handler: HandlerFor<EM, K>) {
    const set = this.handlers.get(event);
    if (!set) return;
    set.delete(handler as Function);
    if (set.size === 0) this.handlers.delete(event);
  }

  async emit<K extends keyof EM & string>(event: K, payload: EM[K]) {
    const set = this.handlers.get(event as string);
    if (!set) return;
    const handlers = Array.from(set) as Array<(p: EM[K]) => void | Promise<void>>;
    await Promise.all(handlers.map((h) => Promise.resolve(h(payload))));
  }
}

export function createPulse<EM extends EventMap = Record<string, EventPayload>>() {
  return new Pulse<EM>();
}

// default untyped singleton for quick use
export const pulse = createPulse();

export function defineEvent<Payload extends EventPayload = EventPayload>(
  event: EventName,
  handler: EventHandler<Payload>
): () => void {
  return pulse.on(event as any, handler as any);
}
