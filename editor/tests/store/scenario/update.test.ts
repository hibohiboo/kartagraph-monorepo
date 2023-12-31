import {
  sceneDataAtom,
  updateNextAtom,
} from '@kartagraph-editor/store/scenario/game';
import { createStore } from 'jotai';
import { defaultScene } from './template/defaultScene';

describe('updateNextAtom', () => {
  test('waitコマンドでmessageがundefinedになること', () => {
    const store = createStore();
    store.set(sceneDataAtom, defaultScene);
    store.set(updateNextAtom, {
      command: 'wait',
    });
    const scene = store.get(sceneDataAtom);
    expect(scene.message).toBeUndefined();
  });
  test('selectコマンドでselectsのみ更新できること', () => {
    const store = createStore();
    store.set(sceneDataAtom, defaultScene);
    store.set(updateNextAtom, {
      command: 'select',
      payload: {
        select: [{ label: '1', next: '2' }],
      },
    });
    const scene = store.get(sceneDataAtom);
    expect(scene.message).toEqual({ text: `1`, image: '/A.png' });
    expect(scene.select).toEqual([{ label: '1', next: '2' }]);
  });
  describe('message', () => {
    test('messageコマンドでmessageのみ更新できること', () => {
      const store = createStore();
      store.set(sceneDataAtom, defaultScene);
      store.set(updateNextAtom, {
        command: 'message',
        payload: { text: `2`, image: '/B.png' },
      });
      const scene = store.get(sceneDataAtom);
      expect(scene.message).toEqual({ text: `2`, image: '/B.png' });
      expect(scene.background?.src).toBe('/BG2.png');
    });
    test('messageコマンドにselectを含めることができること', () => {
      const store = createStore();
      store.set(sceneDataAtom, defaultScene);
      store.set(updateNextAtom, {
        command: 'message',
        payload: {
          text: `2`,
          image: '/B.png',
          select: [{ label: '1', next: '2' }],
        },
      });
      const scene = store.get(sceneDataAtom);
      expect(scene.message).toEqual({ text: `2`, image: '/B.png' });
      expect(scene.background?.src).toBe('/BG2.png');
      expect(scene.select).toEqual([{ label: '1', next: '2' }]);
    });
  });
});
