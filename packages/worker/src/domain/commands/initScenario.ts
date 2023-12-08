import { Scenario } from '@kartagraph-worker/types';
import { selectFirstScene } from '../core';
import {
  selectEvent,
  setCurrentEvent,
  setCurrentScene,
  setScenario,
} from '../store';

const createScenario = (json: string) => {
  const scenario = JSON.parse(json);
  return {
    ...scenario,
    scenes: scenario.scenes.map((scene: any) => ({
      ...scene,
      events: scene.events.flatMap((event: any) => {
        if (event.type === 'messages') {
          const textsLastIndex = event.data.texts.length - 1;
          return event.data.texts.map((text: string, i: number) => ({
            id: i === 0 ? event.id : `${event.id}-${i}`,
            type: 'message',
            data: { text, image: event.data.image },
            next: i === textsLastIndex ? event.next : `${event.id}-${i + 1}`,
          }));
        }
        return [event];
      }),
    })),
  };
};

export const initScenario = (scenarioJson: string) => {
  const scenario: Scenario = createScenario(scenarioJson);
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
