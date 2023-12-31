import { Tree } from 'primereact/tree';
import { BsFilePlay } from 'react-icons/bs';
import { FaImage } from 'react-icons/fa6';
import { GiStabbedNote } from 'react-icons/gi';
import { GiCardboardBox } from 'react-icons/gi';
import { TbCards } from 'react-icons/tb';
interface Card {
  name: string;
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
function IconWithText({ icon, text }: { icon: any; text: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {icon}
      {text}
    </span>
  );
}
const indentStyle = { marginLeft: '1rem' };
function Scene({ scene }: { scene: Scene }) {
  return (
    <>
      <IconWithText icon={<FaImage />} text={scene.title} />

      <div style={{ ...indentStyle }}>
        <IconWithText icon={<GiCardboardBox />} text={'カード一覧'} />
        <ul style={indentStyle}>
          {scene.cards.map((card) => (
            <li>
              <IconWithText icon={<TbCards />} text={card.name} />
            </li>
          ))}
        </ul>
      </div>
      <div style={{ ...indentStyle }}>
        <IconWithText icon={<BsFilePlay />} text={'イベント一覧'} />
        <ul style={indentStyle}>
          {scene.events.map((event) => (
            <li>
              <IconWithText icon={<TbCards />} text={event.type} />
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
