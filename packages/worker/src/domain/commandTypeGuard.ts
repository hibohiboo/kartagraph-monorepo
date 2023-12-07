import {
  GameCoreWorkerMessage,
  InitCommannd,
  NextCommannd,
  TriggerCommannd,
} from '@kartagraph-worker/types';

export const isInitCommand = (
  message: GameCoreWorkerMessage,
): message is InitCommannd => {
  return message.command === 'init';
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
