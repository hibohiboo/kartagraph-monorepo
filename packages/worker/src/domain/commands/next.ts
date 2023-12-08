import { getCurrentEvent, selectEvent } from '../store';

export const next = () => {
  const currentEvent = getCurrentEvent();
  if (currentEvent?.next == null) return { command: 'wait' };
  const nextEvent = selectEvent(currentEvent.next);
  if (nextEvent == null) return { command: 'wait' };

  return { command: nextEvent.type, payload: nextEvent.data };
};
export type NextResult = ReturnType<typeof next>;
