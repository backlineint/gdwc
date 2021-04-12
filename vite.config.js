import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'index.js',
      name: 'components',
    },
    // Bundling lit-element to simplify hosting for now, but may want to make
    // this an external at some point.
    // rollupOptions: {
    //   external: /^lit-element/
    // }
  },
});
