import { TreeNode } from 'primereact/treenode';

export const scenarioToTreeNodeInfo = (state: FileNodeState): TreeNode => {
  return {
    id: state.id,
    key: state.id,
    leaf: state.kind !== 'directory',
    //  pi-fwはアイコンがフィットするように適切な幅に設定されるスタイル
    icon: `pi pi-fw pi-${getIcon(state.kind, state.isExpanded)}`,
    label: state.name,
    expanded: state.isExpanded,
    data: state,
    children: state.children?.map(scenarioToTreeNodeInfo),
  };
};

function getIcon(kind: string, isExpanded: boolean) {
  if (kind === 'directory') {
    return isExpanded ? 'folder-open' : 'folder';
  }
  return 'file';
}
