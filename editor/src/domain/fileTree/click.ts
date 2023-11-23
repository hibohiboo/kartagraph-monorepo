import { FileNodeState } from '../fileSystem/types';
const defaultState = { isSelected: false, isExpanded: false };
const updateState = async (
  item: FileNodeState,
  target: string, // slash区切りのpath ex) dir1/dir2/file1
): Promise<FileNodeState> => {
  // IDが一致したら更新処理を行う
  if (item.id === target) {
    return { ...defaultState, ...item, isSelected: true };
  }

  // 子供がいる場合は再帰的に更新
  if (item.children) {
    return {
      ...item,
      children: await Promise.all(
        item.children.map((child) => updateState(child, target)),
      ),
    };
  }
  return { ...item, isSelected: false };
};
export const updateClickFileNodeState = async (
  path: string,
  fsNodes: FileNodeState[],
) => {
  const newFsList = await Promise.all(
    fsNodes.map((item) => updateState(item, path)),
  );
  return newFsList;
};
