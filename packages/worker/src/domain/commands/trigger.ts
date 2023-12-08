import { EventId } from '@kartagraph-worker/types';
import { setCurrentEvent } from '../store';
import { next } from './next';

export const trigger = (eventId: EventId) => {
  setCurrentEvent({ next: eventId });
  return next();
};
