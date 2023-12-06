import { createResult } from './domain/createResult';
import { GameCoreWorkerMessage } from './types';

self.addEventListener(
  'message',
  (event: MessageEvent<GameCoreWorkerMessage>) => {
    const ret = createResult(event.data);

    self.postMessage(ret);
  },
);

export default {};
