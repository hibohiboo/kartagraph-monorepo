import { Button } from 'primereact/button';
import FileTree from '@kartagraph-editor/components/FileSystem/FileTree';
import { Splitter, SplitterPanel } from 'primereact/splitter';

import FilePreviewer from '@kartagraph-editor/components/FilePreviewer/FilePreviewer';
import ScenarioPreviewer from '@kartagraph-editor/components/ScenarioPreviewer/ScenariPreviewer';
import { useEditorHooks } from '@kartagraph-editor/hooks/useEditorHooks';
import Card from '@kartagraph-ui/components/Card/Card';
import { coreAtom } from '@kartagraph-editor/store/worker/gameCore';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import json from '../data/scenario.json';
function App() {
  const vm = useEditorHooks();

  const [ret, setMessage] = useAtom(coreAtom);
  useEffect(() => {
    setMessage({ command: 'init', payload: JSON.stringify(json) });
  }, []);

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
        </SplitterPanel>
        <SplitterPanel size={20}>
          <FilePreviewer />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
