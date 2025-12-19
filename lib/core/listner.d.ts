import type { EventMap, HandlerFor } from "./types";
import type { Pulse } from "./emitter";
type Handlers<EM extends EventMap> = Partial<{
    [K in keyof EM]: HandlerFor<EM, K & string>;
}>;
export declare function createListener<EM extends EventMap>(p: Pulse<EM>, handlers: Handlers<EM>): {
    off(): void;
};
export {};
