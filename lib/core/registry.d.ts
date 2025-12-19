import { type EventPayload } from "./types";
export declare function defineEvents<T extends Record<string, EventPayload>>(events: T): T;
