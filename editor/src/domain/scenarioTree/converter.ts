/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scenario } from '@kartagraph-editor-ui/index';

export const convertScenario = (scenario: Scenario) => {
  return {
    id: scenario.id,
    title: scenario.title,
    scenes: scenario.scenes.map((scene) => {
      const event = createEvent(scene.eventId, scene.events);
      return {
        id: scene.id,
        title: scene.title,
        isFirstScene: scenario.firstSceneId === scene.id,
        event,
      };
    }),
  };
};

function createEvent(eventId: string | undefined, events: any): any {
  const event = events.find((event: any) => event.id === eventId);
  if (event == null) return undefined;
  return {
    id: event.id,
    type: event.type,
    data: event.data as any,
    next: createEvent(event.next, events),
  };
}
