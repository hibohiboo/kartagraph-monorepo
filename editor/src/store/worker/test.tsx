import { atom } from 'jotai';

export function atomWithBroadcast<Value>(key: string, initialValue: Value) {
  const baseAtom = atom(initialValue);
  const listeners = new Set<(event: MessageEvent<any>) => void>();
  const channel = new BroadcastChannel(key);
  channel.onmessage = (event) => {
    listeners.forEach((l) => l(event));
  };

  const broadcastAtom = atom<Value, { isEvent: boolean; value: Value }>(
    (get) => get(baseAtom),
    (get, set, update) => {
      set(baseAtom, update.value);

      if (!update.isEvent) {
        channel.postMessage(get(baseAtom));
      }
    },
  );
  broadcastAtom.onMount = (setAtom) => {
    const listener = (event: MessageEvent<any>) => {
      setAtom({ isEvent: true, value: event.data });
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };
  const returnedAtom = atom<Value, Value>(
    (get) => get(broadcastAtom),
    (get, set, update) => {
      set(broadcastAtom, { isEvent: false, value: update });
    },
  );
  return returnedAtom;
}
export const broadAtom = atomWithBroadcast('count', 0);
