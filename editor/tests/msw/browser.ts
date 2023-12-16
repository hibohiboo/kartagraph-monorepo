// eslint-disable-next-line import/no-extraneous-dependencies
import { basePath } from '@kartagraph-editor/router';
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
