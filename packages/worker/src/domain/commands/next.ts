import { selectEvent } from '../core';
import { getCurrentEvent, getCurrentScene } from '../store';

export const next = () => {
  const currentScene = getCurrentScene();
  if (currentScene == null) throw new Error('currentScene is null');
  const currentEvent = getCurrentEvent();
  if (currentEvent == null || currentEvent.next == null)
    return { command: 'wait' };
  const nextEvent = selectEvent(currentEvent.next, currentScene.events);
  if (nextEvent == null) return { command: 'wait' };
  return { command: nextEvent.type, payload: nextEvent.data };
};
