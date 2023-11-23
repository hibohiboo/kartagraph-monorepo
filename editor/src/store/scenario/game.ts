import { getSrc } from '@kartagraph-editor/domain/images/getSrc';
import { atom } from 'jotai';

export const sceneDataAtom = atom({
  message: {
    text: `「おはよう！
今日も一日がんばろー」`,
    image: '/images/characters/recept/laugh.png',
  },
  background: {
    src: '/images/backgrounds/adv_inn_2.png',
  },
});

export const sceneAtom = atom((get) => {
  const scene = get(sceneDataAtom);
  const message = scene.message
    ? { ...scene.message, image: getSrc(scene.message.image) }
    : undefined;
  const background = scene.background
    ? { ...scene.background, src: getSrc(scene.background.src) }
    : undefined;
  return { message, background };
});
