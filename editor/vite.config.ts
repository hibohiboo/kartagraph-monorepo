/* eslint-disable turbo/no-undeclared-env-vars */
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config({ path: './.env.local' });

export default defineConfig({
  plugins: [react()],
  base: `/${process.env.SUB_DIR_PATH_BUILDER}/`,
  define: {
    VITE_DEFINE_BASE_PATH: JSON.stringify(process.env.SUB_DIR_PATH_BUILDER),
  },
  resolve: {
    alias: [
      { find: '@kartagraph-editor', replacement: '/src' },
      {
        find: '@kartagraph-ui',
        replacement: path.join(__dirname, '../packages/ui/src'),
      },
      {
        find: '@kartagraph-worker',
        replacement: path.join(__dirname, '../packages/worker/src'),
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 550, // blueprintが538.09 kBあるため、デフォルトの500kBを超えてしまう
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react/jsx-runtime'],
          reactFamily: ['react-router-dom'],
          // others: ['lodash'],
          // others: ['date-fns', 'papaparse'],
          // udon: ['file-saver', 'jszip'],
          // canvas: ['html2canvas'],
          jotai: ['jotai'],
          primereact: [
            'primereact/splitter',
            'primereact/button',
            'primereact/tree',
          ],
        },
      },
    },
  },
});
