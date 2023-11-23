import {
  getRootDirectoryHandle,
  readDirectory,
} from '@kartagraph-editor/domain/fileSystem';
import { getSrc } from '@kartagraph-editor/domain/images/getSrc';
import { fsNodeAtom } from '@kartagraph-editor/store/fileSystem/atoms';
import { useAtom } from 'jotai';
export const useEditorHooks = () => {
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
  const frameArgs = {
    message: {
      text: `「おはよう！
今日も一日がんばろー」`,
      image: getSrc('/images/characters/recept/laugh.png'),
    },
    background: {
      src: getSrc('/images/backgrounds/adv_inn_2.png'),
    },
  };
  return {
    previewData: {
      frame: frameArgs,
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
