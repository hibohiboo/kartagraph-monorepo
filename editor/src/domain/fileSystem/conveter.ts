import { TreeNode } from 'primereact/treenode';
import { FileNodeState } from './types';

export const fileNodeStateToTreeNodeInfo = (state: FileNodeState): TreeNode => {
  return {
    id: state.id,
    leaf: state.kind !== 'directory',
    icon: getIcon(state.kind, state.isExpanded),
    label: state.name,
    expanded: state.isExpanded,
    // isSelected: state.isSelected,
    data: state,
    children: state.children?.map(fileNodeStateToTreeNodeInfo),
  };
};

function getIcon(kind: string, isExpanded: boolean) {
  if (kind === 'directory') {
    return isExpanded ? 'folder-open' : 'folder-close';
  }
  return 'document';
}
