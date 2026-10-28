// A server load means client-side navigation still requests __data.json,
// so every visit to /admin passes through the auth check in hooks.server.ts
export const prerender = false

export const load = () => ({})
