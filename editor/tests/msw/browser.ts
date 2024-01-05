import { basePath } from '@kartagraph-editor/constants';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const initMSW = async () => {
  // if (import.meta.env.DEV) { jestの場合はimport.meta.env.DEVがfalseになる
  if (location.host.includes('localhost')) {
    const worker = setupWorker(...handlers);
    worker.start({
      serviceWorker: {
        url: `/${basePath}/mockServiceWorker.js`,
      },
    });
  }
};
