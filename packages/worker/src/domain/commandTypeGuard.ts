import {
  GameCoreWorkerMessage,
  InitCommannd,
  NextCommannd,
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
