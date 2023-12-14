import FilePreviewer from '@kartagraph-editor/components/FilePreviewer/FilePreviewer';
import FileTree from '@kartagraph-editor/components/FileSystem/FileTree';
import ScenarioPreviewer from '@kartagraph-editor/components/ScenarioPreviewer/ScenariPreviewer';
import { useEditorHooks } from '@kartagraph-editor/hooks/useEditorHooks';
import { useGameCoreHooks } from '@kartagraph-editor/hooks/useGameCore';
import Card from '@kartagraph-ui/components/Card/Card';
import { Button } from 'primereact/button';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Link } from 'react-router-dom';

function App() {
  const vm = useEditorHooks();
  useGameCoreHooks();
  return (
    <div>
      <Splitter>
        <SplitterPanel size={20}>
          <div style={{ height: '100vh', overflowY: 'auto' }}>
            <Button onClick={vm.readRootDirectory}>クリックで読み込み</Button>
            <FileTree /> <pre>{vm.treeJson}</pre>
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
                  left: `${card.y}px`,
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
