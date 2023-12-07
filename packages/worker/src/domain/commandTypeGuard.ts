import {
  GameCoreWorkerMessage,
  InitScenarioCommannd,
  NextCommannd,
  TriggerCommannd,
} from '@kartagraph-worker/types';

export const isInitScenarioCommand = (
  message: GameCoreWorkerMessage,
): message is InitScenarioCommannd => {
  return message.command === 'initScenario';
};
export const isNextCommand = (
  message: GameCoreWorkerMessage,
): message is NextCommannd => {
  return message.command === 'next';
};
export const isTriggerCommannd = (
  message: GameCoreWorkerMessage,
): message is TriggerCommannd => {
  return message.command === 'trigger';
};
