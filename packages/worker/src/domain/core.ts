import { Scenario } from '@kartagraph-worker/types';

export const selectFirstScene = (scenario: Scenario) => {
  return scenario.scenes.find((scene) => {
    return scene.id === scenario.firstSceneId;
  });
};
