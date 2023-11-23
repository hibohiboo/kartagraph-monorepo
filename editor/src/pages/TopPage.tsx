import { Button } from 'primereact/button';
import FileTree from '@kartagraph-editor/components/FileSystem/FileTree';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import {
  getRootDirectoryHandle,
  readDirectory,
} from '@kartagraph-editor/domain/fileSystem';
import { fsNodeAtom } from '@kartagraph-editor/store/fileSystem/atoms';
import { useAtom } from 'jotai';

function App() {
  const [fsNodes, setObj] = useAtom(fsNodeAtom);

  const readRootDirectory = async () => {
    const handle = await getRootDirectoryHandle();
    const ls = await readDirectory(handle, '');
    setObj(
      ls.map((item) => ({
        ...item,
        isExpanded: false,
        isSelected: false,
        id: item.name,
      })),
    );
  };
  return (
    <div>
      <Splitter>
        <SplitterPanel size={20}>
          <div style={{ height: '100vh', overflowY: 'auto' }}>
            <Button onClick={readRootDirectory}>クリックで読み込み</Button>
            <FileTree /> <pre>{JSON.stringify(fsNodes, null, 2)}</pre>
          </div>
        </SplitterPanel>
        <SplitterPanel size={80}></SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
