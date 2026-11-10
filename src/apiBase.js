/* global __API_BASE__ */
// Where the Worker API lives: '' (same origin) on Cloudflare, the workers.dev URL
// on Vercel. Set at build time in vite.config.js.
export const apiUrl = (path) => `${__API_BASE__}${path}`
