import { Scenario } from '@kartagraph-worker/types';
import { selectEvent, selectFirstScene } from '../core';

export const init = (scenario: Scenario) => {
  const currentScene = selectFirstScene(scenario);
  if (currentScene == null) throw new Error('currentScene is null');

  const currentEvent = currentScene.eventId
    ? selectEvent(currentScene.eventId, currentScene.events)
    : undefined;
  const message =
    currentEvent?.data?.text == null ? undefined : currentEvent.data;
  const payload = {
    message,
    background: {
      src: currentScene.backgroundImage,
    },
  };
  return {
    command: 'init',
    payload,
  };
};
