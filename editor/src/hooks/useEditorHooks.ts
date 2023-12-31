import {
  getRootDirectoryHandle,
  readDirectory,
} from '@kartagraph-editor/domain/fileSystem';
import { fsNodeAtom } from '@kartagraph-editor/store/fileSystem/atoms';
import { sceneAtom } from '@kartagraph-editor/store/scenario/game';
import { useAtom } from 'jotai';

export const useEditorHooks = () => {
  const [fsNodes, setObj] = useAtom(fsNodeAtom);
  const [scene] = useAtom(sceneAtom);

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

  return {
    previewData: {
      frame: scene,
      cards: scene.cards,
    },
    readRootDirectory,
    treeJson: JSON.stringify(fsNodes, null, 2),
  };
};
