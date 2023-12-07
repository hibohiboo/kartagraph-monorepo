import {
  sceneDataAtom,
  updateNextAtom,
} from '@kartagraph-editor/store/scenario/game';
import { createStore } from 'jotai';

describe('updateNextAtom', () => {
  test('messageコマンドでmessageのみ更新できること', () => {
    const store = createStore();
    store.set(sceneDataAtom, {
      message: { text: `1`, image: '/A.png' },
      background: { src: '/BG2.png' },
    });
    store.set(updateNextAtom, {
      command: 'message',
      payload: { text: `2`, image: '/B.png' },
    });
    const scene = store.get(sceneDataAtom);
    expect(scene.message).toEqual({ text: `2`, image: '/B.png' });
    expect(scene.background?.src).toBe('/BG2.png');
  });
  test('waitコマンドでmessageがundefinedになること', () => {
    const store = createStore();
    store.set(sceneDataAtom, {
      message: { text: `1`, image: '/A.png' },
      background: { src: '/BG2.png' },
    });
    store.set(updateNextAtom, {
      command: 'wait',
    });
    const scene = store.get(sceneDataAtom);
    expect(scene.message).toBeUndefined();
  });
});
