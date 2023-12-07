import { GameCoreWorkerMessage } from '@kartagraph-worker/types';
import {
  isInitCommand,
  isNextCommand,
  isTriggerCommannd,
} from './commandTypeGuard';
import { init } from './commands/initScenario';
import { next } from './commands/next';
import { trigger } from './commands/trigger';

export const createResult = (workerMessage: GameCoreWorkerMessage) => {
  if (isInitCommand(workerMessage)) {
    return init(workerMessage.payload);
  }
  if (isNextCommand(workerMessage)) {
    return next();
  }
  if (isTriggerCommannd(workerMessage)) {
    return trigger(workerMessage.payload);
  }
};
