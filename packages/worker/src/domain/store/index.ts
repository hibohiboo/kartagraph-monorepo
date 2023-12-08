import { Scenario, ScenarioScene, SceneEvent } from '@kartagraph-worker/types';

let scenario: Scenario | null = null;
let currentScene: ScenarioScene | null = null;
let currentEvent: SceneEvent | null | undefined = null;
export const setScenario = (newScenario: Scenario) => {
  scenario = newScenario;
};
export const setCurrentScene = (newCurrentScene: any) => {
  currentScene = newCurrentScene;
};
export const setCurrentEvent = (newCurrentEvent: any) => {
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
