import { useFileSystem } from '@kartagraph-editor/domain/fileSystem/useFilesystemHooks';
import { Tree } from 'primereact/tree';

function FileTree() {
  const fs = useFileSystem();
  return (
    <div>
      <Tree
        value={fs.treeData}
        onNodeClick={fs.handleNodeClick}
        onExpand={fs.handleNodeExpand}
        onCollapse={fs.handleNodeCollapse}
      />
    </div>
  );
}

export default FileTree;
