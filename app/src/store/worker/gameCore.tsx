import GameCoreWorker from '@kartagraph-worker/gameCore.worker?worker'; // ?workerをつける
import { GameCoreWorkerMessage } from '@kartagraph-worker/types';
import { atom, createStore } from 'jotai';
import { sceneDataAtom, updateNextAtom } from '../scenario/game';
export const gameCoreStore = createStore();
export const scenarioStateAtom = atom<string>('init');
export const scenarioIdAtom = atom<string>('');
export function atomWithGameCoreWorker<Value>(initialValue: Value) {
  const baseAtom = atom(initialValue);

  const worker = new GameCoreWorker(); // worker読み込み
  worker.onmessage = (event) => {
    const data = event.data;
    if (data.command === 'initScenario' || data.command === 'changeScene') {
      gameCoreStore.set(sceneDataAtom, data.payload.sceneData);
      if (event.data.payload.firstEvent) {
        worker.postMessage({
          command: 'trigger',
          payload: event.data.payload.firstEvent,
        });
      }
      return;
    }
    if (data.command === 'endScenario') {
      gameCoreStore.set(scenarioStateAtom, 'endScenario');
      gameCoreStore.set(scenarioIdAtom, data.payload.scenarioId);
      return;
    }
    gameCoreStore.set(updateNextAtom, data);
  };

  const workerAtom = atom<Value, [{ isEvent: boolean; value: Value }], void>(
    (get) => get(baseAtom),
    (get, set, update) => {
      set(baseAtom, update.value);

      if (!update.isEvent) {
        worker.postMessage(get(baseAtom));
      }
    },
  );

  const returnedAtom = atom<Value, [Value], void>(
    (get) => get(workerAtom),
    (get, set, update) => {
      set(workerAtom, { isEvent: false, value: update });
    },
  );
  return returnedAtom;
}
type NullableMessage = GameCoreWorkerMessage | null;
export const coreAtom = atomWithGameCoreWorker<NullableMessage>(null);
