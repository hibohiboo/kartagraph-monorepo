/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scenario } from '@kartagraph-editor-ui/index';

export const convertScenario = (scenario: Scenario) => {
  return {
    id: scenario.id,
    title: scenario.title,
    scenes: scenario.scenes.map((scene) => {
      const event = createEvent(scene.eventId, scene.events, scenario.scenes);
      return {
        id: scene.id,
        title: scene.title,
        isFirstScene: scenario.firstSceneId === scene.id,
        event,
        cards: scene.cards.map((card) => ({
          ...card,
          event: createEvent(card.clickEventId, scene.events, scenario.scenes),
        })),
      };
    }),
  };
};

function createEvent(
  eventId: string | undefined,
  events: any,
  scenes: any,
): any {
  const event = events.find((event: any) => event.id === eventId);
  if (event == null) return undefined;
  if (event.data.select != null) {
    return {
      id: event.id,
      type: event.type,
      data: {
        ...event.data,
        select: event.data.select.map((select: any) => {
          return {
            ...select,
            next: createEvent(select.next, events, scenes),
          };
        }),
      },
    };
  }
  if (event.type === 'changeScene') {
    const scene = scenes.find((scene: any) => scene.id === event.data.sceneId);
    return {
      id: event.id,
      type: event.type,
      data: {
        sceneId: event.data.sceneId,
        title: scene.title,
      },
    };
  }
  return {
    id: event.id,
    type: event.type,
    data: event.data as any,
    next: createEvent(event.next, events, scenes),
  };
}
