import { useGameCoreHooks } from '@kartagraph-app/hooks/useGameCore';
import { useScenarioHooks } from '@kartagraph-app/hooks/useScenarioHooks';
import {
  scenarioIdAtom,
  scenarioStateAtom,
} from '@kartagraph-app/store/worker/gameCore';
import Card from '@kartagraph-ui/components/Card/Card';
import { GameViewer, ToGithub } from '@kartagraph-ui/index';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

function ScenarioPage() {
  const json = useLoaderData() as string;
  useGameCoreHooks(json);
  const navigate = useNavigate();
  const [scenarioState] = useAtom(scenarioStateAtom);
  const [scenarioId] = useAtom(scenarioIdAtom);
  const vm = useScenarioHooks();
  useEffect(() => {
    if (scenarioState === 'endScenario')
      navigate(`/scenario/${scenarioId}/result`);
  }, [navigate, scenarioId, scenarioState]);
  const frame = vm.previewData.frame;
  const cards = vm.previewData.cards.map((card, i) => (
    <Card
      key={i}
      {...card}
      style={{
        position: 'absolute',
        top: `${card.y}px`,
        left: `${card.x}px`,
      }}
    />
  ));
  return (
    <div>
      <GameViewer {...frame}>{cards}</GameViewer>
      <footer
        style={{
          position: 'absolute',
          top: '85vh',
          fontSize: '1rem',
          background: '#000',
        }}
      >
        <Link to="/agreement" style={{ color: '#fff' }}>
          利用規約
        </Link>
        &nbsp;&nbsp;
        <Link to="/privacy-policy" style={{ color: '#fff' }}>
          プライバシーポリシー
        </Link>
        <ToGithub />
      </footer>
    </div>
  );
}

export default ScenarioPage;
