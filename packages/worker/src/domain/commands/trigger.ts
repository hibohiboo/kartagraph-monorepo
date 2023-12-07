import { EventId } from '@kartagraph-worker/types';
import { getCurrentScene, selectEvent, setCurrentEvent } from '../store';

export const trigger = (eventId: EventId) => {
  const nextEvent = selectEvent(eventId);
  if (nextEvent == null) return { command: 'wait' };
  return { command: nextEvent.type, payload: nextEvent.data };
};
