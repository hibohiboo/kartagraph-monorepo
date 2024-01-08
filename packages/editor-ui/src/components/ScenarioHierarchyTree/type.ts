/* eslint-disable @typescript-eslint/no-explicit-any */
interface EventData {
  text: string;
  image: string;
  select?: SelectOption[];
}

interface SelectOption {
  label: string;
  next: EventData | string;
}
type EventType =
  | 'message'
  | 'messages'
  | 'branch'
  | 'addTag'
  | 'endScenario'
  | 'changeScene';

export interface ConvertedSceneEvent {
  id: string;
  type: string; // EventType;
  data?: any;
  next?: ConvertedSceneEvent | string;
}

interface Card {
  name: string;
  src: string;
  x: number;
  y: number;
  clickEventId: string;
  clickedEvent: ConvertedSceneEvent;
}

export interface ConvertedScene {
  id: string;
  title: string;
  isFirstScene: boolean;
  event?: ConvertedSceneEvent;
  cards: Card[];
}

export interface ConvertedScenario {
  id: string;
  title: string;
  scenes: ConvertedScene[];
}
