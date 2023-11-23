import { FileNodeState } from '../fileSystem/types';
import { updateNodes } from './update';

/**
 * ノードを閉じる
 *
 * @param fsNodes  ファイルツリーの状態
 * @param target: string, // slash区切りのpath ex) dir1/dir2/file1
 * @returns
 */
export const updateCollapseFileNodeState = (
  fsNodes: FileNodeState,
  target: string,
) =>
  updateNodes(fsNodes, target, (node) => {
    return { ...node, isExpanded: false };
  });

export const updateCollapseFileNodesState = (
  fsNodes: FileNodeState[],
  target: string,
) => fsNodes.map((node) => updateCollapseFileNodeState(node, target));
