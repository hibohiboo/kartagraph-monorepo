import { GameCoreWorkerMessage, InitCommannd } from '@kartagraph-worker/types';

export const isInitCommand = (
  message: GameCoreWorkerMessage,
): message is InitCommannd => {
  return message.command === 'init';
};
