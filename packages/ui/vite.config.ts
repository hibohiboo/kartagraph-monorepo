import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [{ find: '@kartagraph-ui', replacement: '/src' }],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react/jsx-runtime'],
          // reactFamily: ['react-router-dom'],
          others: ['sanitize-html'],
          primereact: ['primereact/carousel'],
        },
      },
    },
  },
});
