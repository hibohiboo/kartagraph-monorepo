import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [{ find: '@kartagraph-worker', replacement: '/src' }],
  },
});
