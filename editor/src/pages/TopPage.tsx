import FilePreviewer from '@kartagraph-editor/components/FilePreviewer/FilePreviewer';
import ScenarioPreviewer from '@kartagraph-editor/components/ScenarioPreviewer/ScenariPreviewer';
import ScenarioTree from '@kartagraph-editor/domain/scenarioTree/components/ScenarioTree';
import { convertScenario } from '@kartagraph-editor/domain/scenarioTree/converter';
import { useEditorHooks } from '@kartagraph-editor/hooks/useEditorHooks';
import { useGameCoreHooks } from '@kartagraph-editor/hooks/useGameCore';
import { scenarioIdAtom, scenarioStateAtom } from '@kartagraph-editor/store/worker/gameCore';
import { ScenarioHierarchyTree } from '@kartagraph-editor-ui/index';
import Card from '@kartagraph-ui/components/Card/Card';
import { useAtom } from 'jotai';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const vm = useEditorHooks();
  const { scenario } = useGameCoreHooks();
  const navigate = useNavigate();
  const [scenarioState] = useAtom(scenarioStateAtom);
  const [scenarioId] = useAtom(scenarioIdAtom);

  useEffect(() => {
    if (scenarioState === 'endScenario') navigate(`/scenario/${scenarioId}/result`);
  }, [navigate, scenarioId, scenarioState]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertedScenario = convertScenario(scenario) as any;

  return (
    <div>
      <Splitter>
        <SplitterPanel size={15}>
          <div style={{ height: '100vh', overflowY: 'auto', width: '100%' }}>
            <button
              onClick={() => {
                fetch('/v1/api/scenario', { method: 'PUT', body: JSON.stringify(scenario) });
              }}
            >
              保存
            </button>
            <ScenarioHierarchyTree scenario={convertedScenario} />
            <details>
              <summary>▼JSON</summary>
              <pre>{JSON.stringify(convertedScenario, undefined, 2)}</pre>
            </details>
            <details>
              <summary>▼一覧表示</summary>
              <ScenarioTree scenario={scenario} />
            </details>
          </div>
        </SplitterPanel>
        <SplitterPanel size={40}>
          <ScenarioPreviewer
            frame={vm.previewData.frame}
            cards={vm.previewData.cards.map((card, i) => (
              <Card
                key={i}
                {...card}
                style={{
                  position: 'absolute',
                  top: `${card.y}px`,
                  left: `${card.x}px`,
                }}
              />
            ))}
          />
          <footer style={{ fontSize: '1rem', background: '#000' }}>
            <Link to="/agreement" style={{ color: '#fff' }}>
              利用規約
            </Link>
            &nbsp;&nbsp;
            <Link to="/privacy-policy" style={{ color: '#fff' }}>
              プライバシーポリシー
            </Link>
          </footer>
        </SplitterPanel>
        <SplitterPanel size={20}>
          <FilePreviewer />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
