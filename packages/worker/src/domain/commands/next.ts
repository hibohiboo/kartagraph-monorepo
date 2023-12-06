import { selectEvent } from '../core';
import { getCurrentEvent, getCurrentScene, setCurrentEvent } from '../store';

export const next = () => {
  const currentScene = getCurrentScene();
  if (currentScene == null) throw new Error('currentScene is null');
  const currentEvent = getCurrentEvent();
  if (currentEvent == null || currentEvent.next == null)
    return { command: 'wait' };
  const nextEvent = selectEvent(currentEvent.next, currentScene.events);
  setCurrentEvent(nextEvent);
  if (nextEvent == null) return { command: 'wait' };

  return { command: nextEvent.type, payload: nextEvent.data };
};
export type NextResult = ReturnType<typeof next>;
