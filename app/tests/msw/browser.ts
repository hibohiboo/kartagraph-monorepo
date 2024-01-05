import { basePath } from '@kartagraph-app/constants';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const initMSW = async () => {
  if (import.meta.env.DEV) {
    const worker = setupWorker(...handlers);
    worker.start({
      serviceWorker: {
        url: `/${basePath}/mockServiceWorker.js`,
      },
    });
  }
};
