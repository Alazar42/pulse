import { type EventMap, type HandlerFor, type EventHandler, type EventPayload, type EventName } from "./types";
export declare class Pulse<EM extends EventMap = Record<string, EventPayload>> {
    private handlers;
    constructor();
    on<K extends keyof EM & string>(event: K, handler: HandlerFor<EM, K>): () => void;
    once<K extends keyof EM & string>(event: K, handler: HandlerFor<EM, K>): () => void;
    off<K extends keyof EM & string>(event: K, handler: HandlerFor<EM, K>): void;
    unsubscribe<K extends keyof EM & string>(event: K): void;
    offAll<K extends keyof EM & string>(event: K): void;
    clear(): void;
    emit<K extends keyof EM & string>(event: K, payload: EM[K]): Promise<void>;
}
export declare function createPulse<EM extends EventMap = Record<string, EventPayload>>(): Pulse<EM>;
export declare const pulse: Pulse<Record<string, EventPayload>>;
export declare function defineEvent<Payload extends EventPayload = EventPayload>(event: EventName, handler: EventHandler<Payload>): () => void;
