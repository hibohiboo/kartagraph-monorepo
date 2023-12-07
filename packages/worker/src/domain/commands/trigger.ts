import { EventId } from '@kartagraph-worker/types';
import { selectEvent } from '../core';
import { getCurrentScene, setCurrentEvent } from '../store';

export const trigger = (eventId: EventId) => {
  const currentScene = getCurrentScene();
  if (currentScene == null) throw new Error('currentScene is null');
  const nextEvent = selectEvent(eventId, currentScene.events);
  setCurrentEvent(nextEvent);
  if (nextEvent == null) return { command: 'wait' };

  return { command: nextEvent.type, payload: nextEvent.data };
};
