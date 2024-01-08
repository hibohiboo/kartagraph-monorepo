import { Tree } from 'primereact/tree';
import { BsFilePlay } from 'react-icons/bs';
import { FaImage } from 'react-icons/fa6';
import { GiStabbedNote } from 'react-icons/gi';
import { GiCardboardBox } from 'react-icons/gi';
import { GrTrigger } from 'react-icons/gr';
import { TbCards } from 'react-icons/tb';
import { IconWithText } from '../../ScenarioTree/atoms/IconWithText';
import { indentStyle } from '../../ScenarioTree/constants';
import {
  EventId,
  SceneEvent as SceneEvent,
} from '../../ScenarioTree/molecules/EventItem';
import ConvertedEventItem from '../molecules/ConvertedEventItem';
import { ConvertedScenario, ConvertedScene } from '../type';
interface Card {
  name: string;
  clickEventId: EventId;
}

interface Scene {
  id: string;
  title: string;
  cards: Card[];
  events: SceneEvent[];
  eventId?: EventId;
}

export interface Scenario {
  id: string;
  title: string;
  scenes: Scene[];
  firstSceneId: string;
}
const hasSceneEvent = (s: ConvertedScene) => {
  if (s.event) return true;
  if (s.events && s.events.length !== 0) return true;
  return false;
};
function Scene({ scene }: { scene: ConvertedScene }) {
  return (
    <>
      <IconWithText icon={<FaImage />} text={scene.title} />
      <div>
        {hasSceneEvent(scene) && (
          <IconWithText icon={<BsFilePlay />} text={'イベント'} />
        )}
        {scene.event && (
          <div style={indentStyle}>
            <IconWithText icon={<GrTrigger />} text={'到着時'} />
            <ConvertedEventItem event={scene.event} />
          </div>
        )}
        {scene.events && scene.events.length !== 0 && (
          <div style={indentStyle}>
            <IconWithText icon={<BsFilePlay />} text={'名前付イベント'} />
            <ul style={indentStyle}>
              {scene.events.map((event, i) => (
                <li key={`${event.title}-${i}`}>
                  <IconWithText
                    icon={<BsFilePlay />}
                    text={`【${event.title}】`}
                  />
                  <div style={indentStyle}>
                    <ConvertedEventItem
                      event={{ ...event, title: undefined }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <IconWithText icon={<GiCardboardBox />} text={'カード一覧'} />
        <ul style={indentStyle}>
          {scene.cards.map((card, i) => (
            <li key={`${card.name}-${i}`}>
              <IconWithText icon={<TbCards />} text={card.name} />
              <div style={indentStyle}>
                <IconWithText icon={<GrTrigger />} text={'クリック時'} />
                <div style={indentStyle}>
                  <ConvertedEventItem event={card.clickedEvent} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ScenarioHierarchyTree({ scenario }: { scenario: ConvertedScenario }) {
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
    </div>
  );
}

export default ScenarioHierarchyTree;
