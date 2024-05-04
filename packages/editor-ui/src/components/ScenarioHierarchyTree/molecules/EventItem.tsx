import { EllipsisText } from '@kartagraph-editor-ui/components/ScenarioTree/atoms/EllipsisText';
import { IconWithText } from '@kartagraph-editor-ui/components/ScenarioTree/atoms/IconWithText';
import { indentStyle } from '@kartagraph-editor-ui/components/ScenarioTree/constants';
import { BiWindow } from 'react-icons/bi';
import { BiWindows } from 'react-icons/bi';
import { BiPurchaseTag } from 'react-icons/bi';
import { BsFilePlay } from 'react-icons/bs';
import { CgListTree } from 'react-icons/cg';
import { FaFileImage } from 'react-icons/fa6';
import { GiStabbedNote } from 'react-icons/gi';
import { TbArrowBigRightLines } from 'react-icons/tb';
import { TbArrowBigRight } from 'react-icons/tb';
import { ConvertedSceneEvent } from '../type';
import ConvertedEventItem from './ConvertedEventItem';

export type EventId = string;

type SceneEventBase = Omit<ConvertedSceneEvent, 'type' | 'data'>;
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
    select: { label: string; next: ConvertedSceneEvent }[];
  };
}
interface MessagesEvent extends SceneEventBase {
  type: 'messages';
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
    title: string;
  };
}
interface NamedEvent extends SceneEventBase {
  title: string;
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNamedEvent = (e: any): e is NamedEvent => e.title != null;

function MessageEventItem({ event }: { event: MessageEvent }) {
  return (
    <span style={{ display: 'inline-flex' }} title={event.data.text}>
      {/* <IconWithText icon={<BiWindow />} text={event.type} /> */}
      <IconWithText icon={<BiWindow />} text={''} />
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
        {event.data.select.map(({ label, next }, i) => (
          <li key={`${label}-${i}`}>
            <IconWithText icon={<CgListTree />} text={'分岐'} />
            <IconWithText icon={<TbArrowBigRight title={label} />} text={`【${label}】`} />
            {next && (
              <div style={indentStyle}>
                <ConvertedEventItem event={next} />
              </div>
            )}
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
function NamedEventItem({ event }: { event: NamedEvent }) {
  return (
    <IconWithText
      icon={
        <>
          <TbArrowBigRightLines title={event.id} />
          <BsFilePlay />
        </>
      }
      text={`【${event.title}】`}
    />
  );
}
export function HierarchyTreeEventItem({ event }: { event: ConvertedSceneEvent }) {
  if (isNamedEvent(event)) {
    return <NamedEventItem event={event} />;
  } else if (isSelectEvent(event)) {
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
    return <IconWithText icon={<FaFileImage />} text={`シーン切替: 【${event.data.title}】`} />;
  }
  return <IconWithText icon={<BsFilePlay />} text={event.type} />;
}
