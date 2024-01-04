import { Scenario } from '@kartagraph-editor-ui/index';

export const convertScenario = (scenario: Scenario) => {
  return {
    id: scenario.id,
    title: scenario.title,
    scenes: scenario.scenes.map((scene) => {
      return {
        id: scene.id,
        title: scene.title,
        isFirstScene: scenario.firstSceneId === scene.id,
      };
    }),
  };
};
