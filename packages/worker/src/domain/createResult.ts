import { GameCoreWorkerMessage } from '@kartagraph-worker/types';
import {
  isInitScenarioCommand,
  isNextCommand,
  isTriggerCommannd,
} from './commandTypeGuard';
import { initScenario } from './commands/initScenario';
import { next } from './commands/next';
import { trigger } from './commands/trigger';

export const createResult = (workerMessage: GameCoreWorkerMessage) => {
  if (isInitScenarioCommand(workerMessage)) {
    return initScenario(workerMessage.payload);
  }
  if (isNextCommand(workerMessage)) {
    return next();
  }
  if (isTriggerCommannd(workerMessage)) {
    return trigger(workerMessage.payload);
  }
};
