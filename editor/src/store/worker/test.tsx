import { atom, createStore } from 'jotai';
import tryWorker from '../../worker/try.worker?worker'; // ?workerをつける
export const myStore = createStore();
export function atomWithBroadcast<Value>(initialValue: Value) {
  const baseAtom = atom(initialValue);

  const worker = new tryWorker(); // worker読み込み
  worker.onmessage = (event) => {
    const data = event.data;
    console.log('メインスレッドで受信:', data);
    myStore.set(broadcastAtom, { isEvent: true, value: data });
  };

  const broadcastAtom = atom<Value, [{ isEvent: boolean; value: Value }], void>(
    (get) => get(baseAtom),
    (get, set, update) => {
      console.log('broadcastAtom', update);
      set(baseAtom, update.value);

      if (!update.isEvent) {
        worker.postMessage(get(baseAtom));
      }
    },
  );

  const returnedAtom = atom<Value, [Value], void>(
    (get) => get(broadcastAtom),
    (get, set, update) => {
      console.log('重い処理を開始', update);
      set(broadcastAtom, { isEvent: false, value: update });
    },
  );
  return returnedAtom;
}
export const broadAtom = atomWithBroadcast('0');
