export type { NextResult } from './domain/commands/next';
export interface Scene {
  message?: {
    text: string;
    image: string;
  };
  background?: {
    src: string;
  };
}

export interface GameCoreWorkerMessage {
  command: 'init' | 'next';
  payload?: unknown;
}

export interface InitCommannd {
  command: 'init';
  payload: string;
}
export interface NextCommannd {
  command: 'next';
}
type EventId = string;
type SceneId = string;
type CardId = string;
type ImageSrc = string;
type EventType = 'message' | 'messages';
export type SceneEvent = {
  id: EventId;
  type: EventType;
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
type MessageEvent = {
  type: 'message';
  data: {
    text: string;
    image?: ImageSrc;
  };
};
type MessagesEvent = {
  type: 'message';
  data: {
    texts: string[];
    image?: ImageSrc;
  };
};
