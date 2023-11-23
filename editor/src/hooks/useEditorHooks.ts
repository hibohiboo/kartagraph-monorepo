import {
  getRootDirectoryHandle,
  readDirectory,
} from '@kartagraph-editor/domain/fileSystem';
import { getSrc } from '@kartagraph-editor/domain/images/getSrc';
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
      cards: [
        {
          name: '宿の娘',
          src: getSrc('/images/characters/recept/laugh.png'),
          x: 100,
          y: 50,
          onClick: () => {
            console.log('click');
          },
        },
      ],
    },
    readRootDirectory,
    treeJson: JSON.stringify(fsNodes, null, 2),
  };
};
