import { Scenario } from '@kartagraph-editor-ui/index';

export const convertScenario = (scenario: Scenario) => {
  return {
    id: scenario.id,
    title: scenario.title,
    scenes: scenario.scenes.map((scene) => {
      const firstEvent = scene.events.find(
        (event) => event.id === scene.eventId,
      );
      const event =
        firstEvent == null
          ? undefined
          : {
              id: firstEvent.id,
              type: firstEvent.type,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data: firstEvent.data as any,
            };
      return {
        id: scene.id,
        title: scene.title,
        isFirstScene: scenario.firstSceneId === scene.id,
        event,
      };
    }),
  };
};
