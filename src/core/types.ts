export type EventName = string;
export type EventPayload = Record<string, any>;

// Event map: keys are event names, values are payload types for that event
export type EventMap = Record<string, EventPayload>;

export type EventHandler<Payload extends EventPayload = EventPayload> = (
  payload: Payload
) => void | Promise<void>;

// Handler type for a specific EventMap and key
export type HandlerFor<EM extends EventMap, K extends keyof EM & string> = (
  payload: EM[K]
) => void | Promise<void>;

export type EventRegistry = Record<EventName, EventHandler[]>;
