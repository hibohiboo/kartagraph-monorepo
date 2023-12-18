import {
  BaseEvent,
  Scenario,
  ScenarioScene,
  SceneEvent,
} from '@kartagraph-worker/types';

let scenario: Scenario | null = null;
let currentScene: ScenarioScene | null = null;
let currentEvent: BaseEvent | SceneEvent | null | undefined = null;
let currentUserId: string | null = null;
export const setCurrentUserId = (newCurrentUserId: string) => {
  currentUserId = newCurrentUserId;
};
export const getCurrentUserId = () => currentUserId;
export const setScenario = (newScenario: Scenario) => {
  scenario = newScenario;
};
export const setCurrentScene = (newCurrentScene: ScenarioScene) => {
  currentScene = newCurrentScene;
};
export const setCurrentEvent = (newCurrentEvent: BaseEvent | undefined) => {
  currentEvent = newCurrentEvent;
};
export const getScenario = () => scenario;
export const getCurrentScene = () => currentScene;
export const getCurrentEvent = () => currentEvent;
const selectEventFromScene = (eventId: string, events: SceneEvent[]) => {
  return events.find((event) => {
    return event.id === eventId;
  });
};

export const selectEvent = (eventId: string) => {
  const currentScene = getCurrentScene();
  if (currentScene == null) throw new Error('currentScene is null');
  const nextEvent = selectEventFromScene(eventId, currentScene.events);
  setCurrentEvent(nextEvent);
  return nextEvent;
};
const tags: string[] = [];
export const setTag = (tag: string) => {
  tags.push(tag);
};
export const getTags = () => tags;
export const selectTargetScene = (id: string) => {
  const scenario = getScenario();
  if (scenario == null) throw new Error('scenario is null');
  const current = scenario.scenes.find((scene) => {
    return scene.id === id;
  });
  if (current == null) throw new Error('scene is null');
  setCurrentScene(current);
  const sceneData = {
    background: {
      src: current.backgroundImage,
    },
    cards: current.cards ?? [],
  };
  return {
    sceneData,
    firstEvent: current.eventId,
  };
};
