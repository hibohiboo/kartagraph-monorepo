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