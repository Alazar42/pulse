// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist-site',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
})