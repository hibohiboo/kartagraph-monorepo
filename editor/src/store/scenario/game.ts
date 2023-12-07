import { getSrc } from '@kartagraph-editor/domain/images/getSrc';
import { atom } from 'jotai';
import { NextResult, Scene } from '@kartagraph-worker/types';
import { coreAtom, gameCoreStore } from '../worker/gameCore';

export const sceneDataAtom = atom<Scene>({
  cards: [],
});
export const updateNextAtom = atom(null, (get, set, update: NextResult) => {
  const beforeState = get(sceneDataAtom);
  if (update.command === 'wait') {
    set(sceneDataAtom, { ...beforeState, message: undefined });
    return;
  }
  if (update.command === 'message') {
    set(sceneDataAtom, { ...beforeState, message: update.payload });
    return;
  }
});
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
    cards: scene.cards.map((card) => ({
      ...card,
      src: getSrc(card.src),
      onClick: () => {
        gameCoreStore.set(coreAtom, {
          command: 'trigger',
          payload: card.clickEventId,
        });
      },
    })),
    onClickMessage: () => {
      gameCoreStore.set(coreAtom, { command: 'next' });
    },
  };
});
