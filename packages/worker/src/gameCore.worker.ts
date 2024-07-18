import init, { console_log } from '../pkg/test_wasm';
import { createResult } from './domain/createResult';
import { GameCoreWorkerMessage } from './types';

await init();
console_log('hello from rust worker');

self.addEventListener('message', (event: MessageEvent<GameCoreWorkerMessage>) => {
  const ret = createResult(event.data);
  console.log('test web worker');
  console_log('test from rust worker');

  self.postMessage(ret);
});

export default {};
