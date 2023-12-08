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
  payload: string;
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
  | 'branch';
export type SceneEvent = {
  id: EventId;
  type: ResponseEventType;
  data: any;
  next?: EventId;
};
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
  title: string;
  firstSceneId: SceneId;
  scenes: ScenarioScene[];
}
