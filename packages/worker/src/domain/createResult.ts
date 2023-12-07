import { GameCoreWorkerMessage } from '@kartagraph-worker/types';
import {
  isInitCommand,
  isNextCommand,
  isTriggerCommannd,
} from './commandTypeGuard';
import { setScenario } from './store';
import { init } from './commands/init';
import { next } from './commands/next';
import { trigger } from './commands/trigger';

export const createResult = (workerMessage: GameCoreWorkerMessage) => {
  if (isInitCommand(workerMessage)) {
    const scenario = JSON.parse(workerMessage.payload);
    setScenario(scenario);
    return init(scenario);
  }
  if (isNextCommand(workerMessage)) {
    return next();
  }
  if (isTriggerCommannd(workerMessage)) {
    return trigger(workerMessage.payload);
  }
};
