/* eslint-disable turbo/no-undeclared-env-vars */
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://github.com/neo4j-devtools/nvl-boilerplates/blob/main/react/vite/vite.config.js
export default defineConfig({
  plugins: [react()],
  base: `/graph/`,
  build: { target: 'esnext' },
  define: {
    VITE_DEFINE_BASE_PATH: JSON.stringify('graph'),
  },
  resolve: {
    alias: [{ find: '@kartagraph-graphdb', replacement: '/src' }],
  },
  optimizeDeps: {
    exclude: ['@neo4j-nvl/layout-workers'],
    include: [
      '@neo4j-nvl/layout-workers > cytoscape',
      '@neo4j-nvl/layout-workers > cytoscape-cose-bilkent',
      '@neo4j-nvl/layout-workers > @neo4j-bloom/dagre',
      '@neo4j-nvl/layout-workers > bin-pack',
      '@neo4j-nvl/layout-workers > graphlib',
    ],
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
