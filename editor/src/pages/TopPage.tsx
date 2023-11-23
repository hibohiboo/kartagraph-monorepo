import FIlePreviewer from '@kaminiten-editor/components/FilePreviewer/FilePreviewer';
import FileTree from '@kaminiten-editor/components/FileSystem/FileTree';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';
import { Splitter, SplitterPanel } from 'primereact/splitter';

function App() {
  const fs = useFileSystem();
  return (
    <div>
      <Splitter>
        <SplitterPanel size={20}>
          <div style={{ height: '100vh', overflowY: 'auto' }}>
            <Button onClick={fs.readRootDirectory}>クリックで読み込み</Button>
            <FileTree /> <pre>{JSON.stringify(fs.obj, null, 2)}</pre>
          </div>
        </SplitterPanel>
        <SplitterPanel size={80}>
          <FIlePreviewer />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
