/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scenario } from '@kartagraph-editor-ui/index';

export const convertScenario = (scenario: Scenario) => {
  return {
    id: scenario.id,
    title: scenario.title,
    scenes: scenario.scenes.map((scene) => {
      const event = createEvent(scene.eventId, scene.events, scenario.scenes);
      const namedEvents = scene.events
        .filter((e) => e.title != null)
        .map((event) => {
          return {
            ...event,
            data: createData(event, scene.events, scenario.scenes),
            next: createEvent(event.next, scene.events, scenario.scenes),
          };
        });
      return {
        id: scene.id,
        title: scene.title,
        isFirstScene: scenario.firstSceneId === scene.id,
        event,
        cards: scene.cards.map((card) => ({
          ...card,
          clickedEvent: createEvent(
            card.clickEventId,
            scene.events,
            scenario.scenes,
          ),
        })),
        events: namedEvents,
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
  if (event.title != null) {
    return {
      id: event.id,
      title: event.title,
    };
  }

  const data = createData(event, events, scenes);

  return {
    id: event.id,
    type: event.type,
    data,
    next: createEvent(event.next, events, scenes),
  };
}

function createData(event: any, events: any, scenes: any): any {
  if (event.data == null) return undefined;
  if (event.data.select != null) {
    return {
      ...event.data,
      select: event.data.select.map((select: any) => {
        return {
          ...select,
          next: createEvent(select.next, events, scenes),
        };
      }),
    };
  }
  if (event.type === 'changeScene') {
    const scene = scenes.find((scene: any) => scene.id === event.data.sceneId);
    return {
      sceneId: event.data.sceneId,
      title: scene.title,
    };
  }
  if (typeof event.data.next === 'string') {
    return {
      ...event.data,
      next: createEvent(event.data.next, events, scenes),
    };
  }
  return event.data;
}
