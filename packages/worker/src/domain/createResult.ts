import { GameCoreWorkerMessage } from '@kartagraph-worker/types';
import { isInitCommand } from './commandTypeGuard';
import { setScenario } from './store';
import { init } from './commands/init';

export const createResult = (workerMessage: GameCoreWorkerMessage) => {
  if (isInitCommand(workerMessage)) {
    const scenario = JSON.parse(workerMessage.payload);
    setScenario(scenario);
    return init(scenario);
  }
};
