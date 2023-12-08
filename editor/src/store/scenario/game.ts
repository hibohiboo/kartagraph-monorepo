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
    const { text, image, select } = update.payload;
    set(sceneDataAtom, {
      ...beforeState,
      message: { text, image },
      select,
    });
    return;
  }
  if (update.command === 'select') {
    set(sceneDataAtom, { ...beforeState, select: update.payload.select });
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
      clickable: !!card.clickEventId,
      onClick: !card.clickEventId
        ? undefined
        : () => {
            gameCoreStore.set(coreAtom, {
              command: 'trigger',
              payload: card.clickEventId,
            });
          },
    })),
    onClickMessage: () => {
      gameCoreStore.set(coreAtom, { command: 'next' });
    },
    selectItems: scene.select?.map((select) => (select ? select.label : '')),
    onSelected: createOnSelect(scene),
  };
});
function createOnSelect(scene: Scene) {
  if (scene.select == null) return undefined;

  const onSelect = (selectedLabel: string) => {
    const selected = scene.select?.find((s) => s.label === selectedLabel);
    if (!selected) return undefined;
    const beforeState = gameCoreStore.get(sceneDataAtom);
    gameCoreStore.set(sceneDataAtom, { ...beforeState, select: undefined });
    gameCoreStore.set(coreAtom, {
      command: 'trigger',
      payload: selected.next,
    });
  };
  return onSelect;
}
