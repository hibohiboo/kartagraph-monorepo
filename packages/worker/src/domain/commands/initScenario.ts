import { Scenario } from '@kartagraph-worker/types';
import { selectFirstScene } from '../core';
import {
  selectEvent,
  setCurrentEvent,
  setCurrentScene,
  setScenario,
} from '../store';

export const initScenario = (scenarioJson: string) => {
  const scenario: Scenario = JSON.parse(scenarioJson);
  setScenario(scenario);
  const currentScene = selectFirstScene(scenario);
  if (currentScene == null) throw new Error('currentScene is null');
  setCurrentScene(currentScene);
  const currentEvent = currentScene.eventId
    ? selectEvent(currentScene.eventId)
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
    command: 'initScenario',
    payload,
  };
};
