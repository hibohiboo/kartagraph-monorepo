import { Scenario } from '@kartagraph-worker/types';
import { selectEvent, selectFirstScene } from '../core';
import { setCurrentEvent, setCurrentScene } from '../store';

export const init = (scenario: Scenario) => {
  const currentScene = selectFirstScene(scenario);
  if (currentScene == null) throw new Error('currentScene is null');
  setCurrentScene(currentScene);
  const currentEvent = currentScene.eventId
    ? selectEvent(currentScene.eventId, currentScene.events)
    : undefined;
  if (currentEvent) setCurrentEvent(currentEvent);
  const message =
    currentEvent?.data?.text == null ? undefined : currentEvent.data;
  const payload = {
    message,
    background: {
      src: currentScene.backgroundImage,
    },
    cards: currentScene.cards ?? [],
  };
  return {
    command: 'init',
    payload,
  };
};
