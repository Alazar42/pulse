// src/core/registry.ts
import { type EventPayload } from "./types";

export function defineEvents<T extends Record<string, EventPayload>>(events: T): T {
  return events;
}
