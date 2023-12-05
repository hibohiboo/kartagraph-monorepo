import { getSrc } from '@kartagraph-editor/domain/images/getSrc';
import { atom } from 'jotai';
import { Scene } from '@kartagraph-worker/types';
export const sceneDataAtom = atom<Scene>({});

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
  return { message, background };
});
