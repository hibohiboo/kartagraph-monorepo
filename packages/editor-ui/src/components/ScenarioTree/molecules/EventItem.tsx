import { BiWindow } from 'react-icons/bi';
import { BiWindows } from 'react-icons/bi';
import { BiPurchaseTag } from 'react-icons/bi';
import { BsFilePlay } from 'react-icons/bs';
import { CgListTree } from 'react-icons/cg';
import { FaFileImage } from 'react-icons/fa6';
import { GiStabbedNote } from 'react-icons/gi';
import { TbArrowBigRightLines } from 'react-icons/tb';
import { EllipsisText } from '../atoms/EllipsisText';
import { IconWithText } from '../atoms/IconWithText';
import { indentStyle } from '../constants';
export type EventId = string;
type EventType = 'message' | 'messages' | 'branch' | 'addTag' | 'endScenario';
export interface SceneEvent {
  id: EventId;
  type: string | EventType;
  data?: unknown;
  next?: EventId;
  title?: string;
}
type SceneEventBase = Omit<SceneEvent, 'type' | 'data'>;
interface MessageEvent extends SceneEventBase {
  type: 'message';
  data: {
    text: string;
    image?: string;
  };
}
interface SelectEvent extends SceneEventBase {
  type: 'message';
  data: {
    text: string;
    image?: string;
    select: { label: string; next: EventId }[];
  };
}
interface MessagesEvent extends SceneEventBase {
  type: 'message';
  data: {
    texts: string[];
    image?: string;
  };
}

interface BranchEvent extends SceneEventBase {
  type: 'branch';
  data: {
    condition: 'hasTag';
    tag: string;
    next: EventId;
  };
}
interface AddTagEvent extends SceneEventBase {
  type: 'addTag';
  data: {
    name: string;
  };
}
interface EndScenarioEvent extends SceneEventBase {
  type: 'endScenario';
}
interface ChangeScene extends SceneEventBase {
  type: 'changeScene';
  data: {
    sceneId: string;
  };
}
function isEventFactory<T extends { type: string }>(type: string) {
  return (e: { type: string }): e is T => e.type === type;
}
const isMessageEvent = isEventFactory<MessageEvent>('message');
const isMessagesEvent = isEventFactory<MessagesEvent>('messages');
const isBranchEvent = isEventFactory<BranchEvent>('branch');
const isAddTagsEvent = isEventFactory<AddTagEvent>('addTag');
const isEndScenarioEvent = isEventFactory<EndScenarioEvent>('endScenario');
const isChangeSceneEvent = isEventFactory<ChangeScene>('changeScene');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSelectEvent = (e: any): e is SelectEvent => e.data?.select != null;

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
function SelectEventItem({ event }: { event: SelectEvent }) {
  return (
    <>
      <IconWithText icon={<BiWindow />} text={event.data.text} />
      <ul style={indentStyle}>
        {event.data.select.map(({ label }, i) => (
          <li key={`${label}-${i}`}>
            <IconWithText icon={<CgListTree />} text={'分岐'} />
            <IconWithText icon={<TbArrowBigRightLines title={label} />} text={`【${label}】`} />
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
      <IconWithText icon={<BiPurchaseTag title={event.data.condition} />} text={`【${event.data.tag}】を所持`} />
    </span>
  );
}
export function EventItem({ event }: { event: SceneEvent }) {
  if (isSelectEvent(event)) {
    return <SelectEventItem event={event} />;
  } else if (isMessageEvent(event)) {
    return <MessageEventItem event={event} />;
  } else if (isMessagesEvent(event)) {
    return <MessagesEventItem event={event} />;
  } else if (isBranchEvent(event)) {
    return <BranchEventItem event={event} />;
  } else if (isAddTagsEvent(event)) {
    return <IconWithText icon={<BiPurchaseTag />} text={`【${event.data.name}】を追加`} />;
  } else if (isEndScenarioEvent(event)) {
    return <IconWithText icon={<GiStabbedNote />} text={event.type} />;
  } else if (isChangeSceneEvent(event)) {
    return <IconWithText icon={<FaFileImage />} text={event.type} />;
  }
  return <IconWithText icon={<BsFilePlay />} text={event.type} />;
}
