import { Button } from 'primereact/button';
import FileTree from '@kartagraph-editor/components/FileSystem/FileTree';
import { Splitter, SplitterPanel } from 'primereact/splitter';

import FilePreviewer from '@kartagraph-editor/components/FilePreviewer/FilePreviewer';
import ScenarioPreviewer from '@kartagraph-editor/components/ScenarioPreviewer/ScenariPreviewer';
import { useEditorHooks } from '@kartagraph-editor/hooks/useEditorHooks';
import Card from '@kartagraph-ui/components/Card/Card';
import tryWorker from '../worker/try.worker?worker'; // ?workerをつける
import { useEffect, useRef } from 'react';
import { broadAtom } from '@kartagraph-editor/store/worker/test';
import { useAtom } from 'jotai';
function App() {
  const vm = useEditorHooks();

  const workerRef = useRef<Worker | null>(null);
  useEffect(() => {
    workerRef.current = new tryWorker(); // worker読み込み

    workerRef.current.onmessage = (event) => {
      const data = event.data;
      console.log('メインスレッドで受信:', data);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);
  const handleClick = () => {
    if (workerRef.current) {
      console.log('メインスレッドで送信');
      workerRef.current.postMessage('開始');
    }
  };

  const [count, setCount] = useAtom(broadAtom);

  return (
    <div>
      <Splitter>
        <SplitterPanel size={20}>
          <div style={{ height: '100vh', overflowY: 'auto' }}>
            <Button onClick={vm.readRootDirectory}>クリックで読み込み</Button>
            <FileTree /> <pre>{vm.treeJson}</pre>
            <button onClick={handleClick}>重い処理を開始</button>
            {count}
            <button onClick={() => setCount(count + 1)}>+1</button>
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
