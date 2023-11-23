import { Button } from 'primereact/button';
import FileTree from '@kartagraph-editor/components/FileSystem/FileTree';
import { Splitter, SplitterPanel } from 'primereact/splitter';

import FilePreviewer from '@kartagraph-editor/components/FilePreviewer/FilePreviewer';
import ScenarioPreviewer from '@kartagraph-editor/components/ScenarioPreviewer/ScenariPreviewer';
import { useEditorHooks } from '@kartagraph-editor/hooks/useEditorHooks';

function App() {
  const vm = useEditorHooks();

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
          <ScenarioPreviewer {...vm.previewData} />
        </SplitterPanel>
        <SplitterPanel size={20}>
          <FilePreviewer />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
