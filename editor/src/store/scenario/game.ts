import { getSrc } from '@kartagraph-editor/domain/images/getSrc';
import { atom } from 'jotai';
import { NextResult, Scene } from '@kartagraph-worker/types';
import { coreAtom, gameCoreStore } from '../worker/gameCore';

export const sceneDataAtom = atom<Scene>({});
export const updateNextAtom = atom(
  () => {},
  (get, set, update: NextResult) => {
    const beforeState = get(sceneDataAtom);
    if (update.command === 'wait') {
      set(sceneDataAtom, { ...beforeState, message: undefined });
      return;
    }
    if (update.command === 'message') {
      set(sceneDataAtom, { ...beforeState, message: update.payload });
      return;
    }
  },
);
export const sceneAtom = atom((get) => {
  const scene = get(sceneDataAtom);
  const message = scene.message
    ? {
        ...scene.message,
        image: scene.message.image ? getSrc(scene.message.image) : undefined,
      }
    : undefined;
  const background = scene.background
    ? { ...scene.background, src: getSrc(scene.background.src) }
    : undefined;
  return {
    message,
    background,
    onClickMessage: () => {
      gameCoreStore.set(coreAtom, { command: 'next' });
    },
  };
});
