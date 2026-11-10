import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  define: {
    // Vercel only hosts the static site; its pages call the Cloudflare Worker directly
    // (see src/apiBase.js). On Cloudflare the API is same-origin, so this stays ''.
    __API_BASE__: JSON.stringify(
      process.env.VERCEL ? 'https://campaign-website-heat-motion26.andybeatquarcoo.workers.dev' : '',
    ),
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
