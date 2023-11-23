import {
  sceneAtom,
  sceneDataAtom,
} from '@kartagraph-editor/store/scenario/game';
import { createStore } from 'jotai';

test('ベースパスを付与できること', () => {
  const store = createStore();
  store.set(sceneDataAtom, {
    message: {
      text: `test`,
      image: '/images/characters/recept/laugh.png',
    },
    background: {
      src: '/images/backgrounds/adv_inn_2.png',
    },
  }); // 初期値を設定
  const scene = store.get(sceneAtom);

  expect(scene.message?.image).toBe(
    '/editor/images/characters/recept/laugh.png',
  );
  expect(scene.background?.src).toBe(
    '/editor/images/backgrounds/adv_inn_2.png',
  );
});
