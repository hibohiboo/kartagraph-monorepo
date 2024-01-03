import { Tree } from 'primereact/tree';
import { BiWindow } from 'react-icons/bi';
import { BiWindows } from 'react-icons/bi';
import { BiPurchaseTag } from 'react-icons/bi';
import { BsFilePlay } from 'react-icons/bs';
import { CgListTree } from 'react-icons/cg';
import { FaImage } from 'react-icons/fa6';
import { GiStabbedNote } from 'react-icons/gi';
import { GiCardboardBox } from 'react-icons/gi';
import { TbCards } from 'react-icons/tb';

interface Card {
  name: string;
}
type EventId = string;
interface MessageEvent {
  id: EventId;
  type: 'message';
  data: {
    text: string;
    image?: string;
  };
  next?: EventId;
}
interface MessagesEvent {
  id: EventId;
  type: 'message';
  data: {
    texts: string[];
    image?: string;
  };
  next?: EventId;
}

interface BranchEvent {
  id: string;
  type: 'branch';
  data: {
    condition: 'hasTag';
    tag: string;
    next: EventId;
  };
  next?: EventId;
}
interface Event {
  id: string;
  type: 'message' | 'messages' | 'branch';
}
interface Scene {
  id: string;
  title: string;
  cards: Card[];
  events: Event[];
}

interface Scenario {
  title: string;
  scenes: Scene[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IconWithText({ icon, text }: { icon: any; text: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {icon}
      {text}
    </span>
  );
}
function EllipsisText({ text }: { text: string }) {
  return (
    <span
      style={{
        width: '15rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
      }}
      title={text}
    >
      {text}
    </span>
  );
}
function MessageEventItem({ event }: { event: MessageEvent }) {
  return (
    <span style={{ display: 'inline-flex' }}>
      <IconWithText icon={<BiWindow />} text={event.type} />
      <EllipsisText text={event.data.text} />
    </span>
  );
}
function MessagesEventItem({ event }: { event: MessagesEvent }) {
  return (
    <>
      <IconWithText icon={<BiWindows />} text={event.type} />
      <ul style={indentStyle}>
        {event.data.texts.map((text, i) => (
          <li key={`${text}-${i}`}>
            <MessageEventItem
              event={{
                id: `${event.id}-${i}`,
                type: 'message',
                data: { text },
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
function BranchEventItem({ event }: { event: BranchEvent }) {
  return (
    <span style={{ display: 'inline-flex' }}>
      <IconWithText icon={<CgListTree />} text={'分岐'} />
      <IconWithText
        icon={<BiPurchaseTag title={event.data.condition} />}
        text={`【${event.data.tag}】を所持`}
      />
    </span>
  );
}
const indentStyle = { marginLeft: '1rem' };
function isEventFactory<T extends { type: string }>(type: string) {
  return (e: { type: string }): e is T => e.type === type;
}
const isMessageEvent = isEventFactory<MessageEvent>('message');
const isMessagesEvent = isEventFactory<MessagesEvent>('messages');
const isBranchEvent = isEventFactory<BranchEvent>('branch');
function EventItem({ event }: { event: Event }) {
  if (isMessageEvent(event)) {
    return <MessageEventItem event={event} />;
  } else if (isMessagesEvent(event)) {
    return <MessagesEventItem event={event} />;
  } else if (isBranchEvent(event)) {
    return <BranchEventItem event={event} />;
  }
  return <IconWithText icon={<BsFilePlay />} text={event.type} />;
}
function Scene({ scene }: { scene: Scene }) {
  return (
    <>
      <IconWithText icon={<FaImage />} text={scene.title} />

      <div style={{ ...indentStyle }}>
        <IconWithText icon={<GiCardboardBox />} text={'カード一覧'} />
        <ul style={indentStyle}>
          {scene.cards.map((card) => (
            <li key={card.name}>
              <IconWithText icon={<TbCards />} text={card.name} />
            </li>
          ))}
        </ul>
      </div>
      <div style={{ ...indentStyle }}>
        <IconWithText icon={<BsFilePlay />} text={'イベント一覧'} />
        <ul style={indentStyle}>
          {scene.events.map((event) => (
            <li key={event.id}>
              <EventItem event={event} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
function ScenarioTree({ scenario }: { scenario: Scenario }) {
  return (
    <div>
      <h2 style={{ display: 'inline-flex', alignItems: 'center' }}>
        <IconWithText icon={<GiStabbedNote />} text={scenario.title} />
      </h2>
      <div>
        <ul>
          {scenario.scenes.map((scene) => (
            <li key={scene.id} style={{ lineHeight: '1.5' }}>
              <Scene scene={scene} />
            </li>
          ))}
        </ul>
      </div>
      <Tree />
      <pre>{JSON.stringify(scenario, null, 2)}</pre>
    </div>
  );
}

export default ScenarioTree;
