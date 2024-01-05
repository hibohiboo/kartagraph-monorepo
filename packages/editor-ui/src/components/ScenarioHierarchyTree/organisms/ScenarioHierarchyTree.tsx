import { Tree } from 'primereact/tree';
import { BsFilePlay } from 'react-icons/bs';
import { FaImage } from 'react-icons/fa6';
import { GiStabbedNote } from 'react-icons/gi';
import { GiCardboardBox } from 'react-icons/gi';
import { TbCards } from 'react-icons/tb';
import { IconWithText } from '../../ScenarioTree/atoms/IconWithText';
import { indentStyle } from '../../ScenarioTree/constants';
import {
  EventId,
  EventItem,
  SceneEvent,
} from '../../ScenarioTree/molecules/EventItem';
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
