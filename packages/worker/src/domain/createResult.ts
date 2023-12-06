import { GameCoreWorkerMessage } from '@kartagraph-worker/types';
import { isInitCommand, isNextCommand } from './commandTypeGuard';
import { setScenario } from './store';
import { init } from './commands/init';
import { next } from './commands/next';

export const createResult = (workerMessage: GameCoreWorkerMessage) => {
  if (isInitCommand(workerMessage)) {
    const scenario = JSON.parse(workerMessage.payload);
    setScenario(scenario);
    return init(scenario);
  }
  if (isNextCommand(workerMessage)) {
    return next();
  }
};
