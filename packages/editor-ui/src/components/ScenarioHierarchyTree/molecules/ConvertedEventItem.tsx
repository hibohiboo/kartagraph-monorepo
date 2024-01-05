import { indentStyle } from '@kartagraph-editor-ui/components/ScenarioTree/constants';
import { ConvertedSceneEvent } from '../type';
import { HierarchyTreeEventItem } from './EventItem';

export default function ConvertedEventItem({
  event,
}: {
  event: ConvertedSceneEvent;
}) {
  if (!event) return <></>;

  return (
    <div style={indentStyle}>
      <HierarchyTreeEventItem event={event} />
      {event.next && typeof event.next !== 'string' && (
        <div style={indentStyle}>
          <ConvertedEventItem event={event.next} />
        </div>
      )}
    </div>
  );
}
