import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: { target: 'esnext' },
  optimizeDeps: {
    exclude: ['@kuzu/kuzu-wasm'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});
