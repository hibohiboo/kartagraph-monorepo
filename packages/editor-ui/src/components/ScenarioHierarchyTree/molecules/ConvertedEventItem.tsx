import { indentStyle } from '@kartagraph-editor-ui/components/ScenarioTree/constants';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { ConvertedSceneEvent } from '../type';
import { HierarchyTreeEventItem } from './EventItem';
export default function ConvertedEventItem({
  event,
}: {
  event: ConvertedSceneEvent;
}) {
  if (!event) return <></>;
  if (event.type === 'branch')
    return <BranchConvertedEventItem event={event} />;
  return (
    <div style={indentStyle}>
      <HierarchyTreeEventItem event={event} />
      {event.next && typeof event.next !== 'string' && (
        <ConvertedEventItem event={event.next} />
      )}
    </div>
  );
}
function BranchConvertedEventItem({ event }: { event: ConvertedSceneEvent }) {
  const branchItemStyle = {
    ...indentStyle,
    display: 'flex',
    alignItems: 'baseline',
  };
  return (
    <div>
      <HierarchyTreeEventItem event={event} />
      {event.data && event.data.next && typeof event.data.next !== 'string' && (
        <div style={branchItemStyle}>
          <FaRegCheckCircle />
          <ConvertedEventItem event={event.data.next} />
        </div>
      )}
      {event.next && typeof event.next !== 'string' && (
        <div style={branchItemStyle}>
          <FaRegTimesCircle />
          <ConvertedEventItem event={event.next} />
        </div>
      )}
    </div>
  );
}
