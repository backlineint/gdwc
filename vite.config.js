import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'index.js',
      name: 'components',
    },
    rollupOptions: {
      external: /^lit-element/
    }
  }
})
