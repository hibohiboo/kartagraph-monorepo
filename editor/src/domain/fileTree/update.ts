import { FileNodeState } from '../fileSystem/types';

export function updateNodes(
  item: FileNodeState,
  target: string, // slash区切りのpath ex) dir1/dir2/file1
  callback: (node: FileNodeState) => FileNodeState,
): FileNodeState {
  // IDが一致したら更新処理を行う
  if (item.id === target) {
    return callback(item);
  }

  // 子供がいる場合は再帰的に更新
  if (item.children) {
    return {
      ...item,
      children: item.children.map((child) =>
        updateNodes(child, target, callback),
      ),
    };
  }
  return item;
}
