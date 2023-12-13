export type { NextResult } from './domain/commands/next';
type Card = {
  name: string;
  src: string;
  x: number;
  y: number;
  clickEventId: string;
};
export interface Scene {
  message?: {
    text: string;
    image: string;
  };
  background?: {
    src: string;
  };
  cards: Card[];
  select?: {
    label: string;
    next: string;
  }[];
}

export interface GameCoreWorkerMessage {
  command: 'initScenario' | 'next' | 'trigger' | 'addTag';
  payload?: unknown;
}

export interface InitScenarioCommannd {
  command: 'initScenario';
  payload: {
    scenarioJson: string;
    userId: string;
  };
}
export interface NextCommannd {
  command: 'next';
}
export interface TriggerCommannd {
  command: 'trigger';
  payload: EventId;
}
export type EventId = string;
type SceneId = string;
type CardId = string;
type ImageSrc = string;
export type ResponseEventType =
  | 'message'
  | 'select'
  | 'wait'
  | 'addTag'
  | 'branch'
  | 'endScenario';
export type BaseEvent = { next?: EventId };
export type SceneEvent = {
  id: EventId;
  type: ResponseEventType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
} & BaseEvent;
export type ScenarioScene = {
  id: SceneId;
  eventId?: EventId;
  backgroundImage: ImageSrc;
  events: SceneEvent[];
  cards: {
    id: CardId;
    name: string;
    image: ImageSrc;
    clickEventId: EventId;
  };
};
export interface Scenario {
  id: string;
  title: string;
  firstSceneId: SceneId;
  scenes: ScenarioScene[];
}
