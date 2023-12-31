import { fileNodeStateToTreeNodeInfo } from '@kartagraph-editor/domain/fileSystem/conveter';
import { updateClickFileNodeState } from '@kartagraph-editor/domain/fileTree/click';
import { updateCollapseFileNodesState } from '@kartagraph-editor/domain/fileTree/collapse';
import { updateFileNodeState } from '@kartagraph-editor/domain/fileTree/expand';
import {
  fileAtom,
  fsNodeAtom,
} from '@kartagraph-editor/store/fileSystem/atoms';
import { useAtom } from 'jotai';
import { TreeEventNodeEvent } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import React from 'react';
import { FileNodeState } from './types';
import { getDirectoryHandle, getRootDirectoryHandle, readFile } from './index';

export function useFileSystem() {
  const [fsNodes, setObj] = useAtom(fsNodeAtom);
  const [, setFile] = useAtom(fileAtom);

  const treeData: TreeNode[] = fsNodes.map(fileNodeStateToTreeNodeInfo);

  const handleNodeExpand = React.useCallback(
    async (event: TreeEventNodeEvent) => {
      const node = event.node as TreeNode;
      const newFsList = await updateFileNodeState(node.id as string, fsNodes);
      setObj(newFsList);
    },
    [fsNodes, setObj],
  );
  const handleNodeCollapse = React.useCallback(
    async (event: TreeEventNodeEvent) => {
      const newFsList = updateCollapseFileNodesState(fsNodes, event.node.id!);
      setObj(newFsList);
    },
    [fsNodes, setObj],
  );
  const handleNodeClick = React.useCallback(
    async (event: TreeEventNodeEvent) => {
      const node = event.node;
      const data = node.data as FileNodeState;
      if (data.kind === 'file') {
        const newFsList = await updateClickFileNodeState(
          node.id as string,
          fsNodes,
        );
        setObj(newFsList);
        const handle = await getRootDirectoryHandle();
        const dirHandle = await getDirectoryHandle(handle, data.dirPath);
        if (!dirHandle) return;
        const file = await readFile(dirHandle, data.name);

        setFile(file);
        return;
      }
      if (data.kind !== 'directory') return;
      if (node.expanded) {
        await handleNodeCollapse(event);
        return;
      }
      await handleNodeExpand(event);
    },
    [fsNodes, handleNodeCollapse, handleNodeExpand, setFile, setObj],
  );
  return {
    obj: fsNodes,
    treeData,
    handleNodeClick,
    handleNodeExpand,
    handleNodeCollapse,
  };
}
