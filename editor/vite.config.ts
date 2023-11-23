import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './.env' });

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
    ],
  },
});
