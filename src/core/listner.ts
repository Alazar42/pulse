import type { EventMap, HandlerFor } from "./types";
import type { Pulse } from "./emitter";

type Handlers<EM extends EventMap> = Partial<{ [K in keyof EM]: HandlerFor<EM, K & string> }>;

export function createListener<EM extends EventMap>(p: Pulse<EM>, handlers: Handlers<EM>) {
	const unsub: Array<() => void> = [];
	for (const k in handlers) {
		const h = handlers[k as keyof Handlers<EM>];
		if (h) {
			// cast to any to bridge types at runtime
			unsub.push(p.on(k as any, h as any));
		}
	}
	return {
		off() {
			unsub.forEach((u) => u());
		},
	};
}

export {};
