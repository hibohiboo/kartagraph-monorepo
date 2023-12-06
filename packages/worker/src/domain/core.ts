import { Scenario, SceneEvent } from '@kartagraph-worker/types';

export const selectFirstScene = (scenario: Scenario) => {
  return scenario.scenes.find((scene) => {
    return scene.id === scenario.firstSceneId;
  });
};
export const selectEvent = (eventId: string, events: SceneEvent[]) => {
  return events.find((event) => {
    return event.id === eventId;
  });
};
