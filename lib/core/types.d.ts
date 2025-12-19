export type EventName = string;
export type EventPayload = Record<string, any>;
export type EventMap = Record<string, EventPayload>;
export type EventHandler<Payload extends EventPayload = EventPayload> = (payload: Payload) => void | Promise<void>;
export type HandlerFor<EM extends EventMap, K extends keyof EM & string> = (payload: EM[K]) => void | Promise<void>;
export type EventRegistry = Record<EventName, EventHandler[]>;
