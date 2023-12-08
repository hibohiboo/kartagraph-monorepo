import { ResponseEventType } from '@kartagraph-worker/types';
import { getCurrentEvent, getTags, selectEvent, setTag } from '../store';
import { trigger } from './trigger';

export const next = (): { command: ResponseEventType; payload?: any } => {
  const currentEvent = getCurrentEvent();
  if (currentEvent?.next == null) return { command: 'wait' };
  const nextEvent = selectEvent(currentEvent.next);
  if (nextEvent == null) return { command: 'wait' };
  if (nextEvent.type === 'addTag') {
    setTag(nextEvent.data.name);
    return next();
  }
  if (nextEvent.type === 'branch') {
    if (nextEvent.data.condition == null)
      throw new Error('branch event must have conditions');
    if (
      nextEvent.data.condition === 'hasTag' &&
      getTags().includes(nextEvent.data.tag)
    ) {
      return trigger(nextEvent.data.next);
    }
    return next();
  }
  return { command: nextEvent.type, payload: nextEvent.data };
};
export type NextResult = ReturnType<typeof next>;
