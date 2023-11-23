import { updateClickFileNodeState } from '@kartagraph-editor/domain/fileTree/click';

const defaultNode = {
  id: 'test',
  kind: 'document',
  name: 'test',
  dirPath: '',
  isExpanded: false,
  isSelected: false,
};
describe('updateClickFileNodeState', () => {
  describe('選択したパスをtrueにすること', () => {
    it('1階層', async () => {
      const fsNodes = [
        {
          ...defaultNode,
          isSelected: false,
        },
      ];
      const result = await updateClickFileNodeState('test', fsNodes);
      expect(result[0].isSelected).toBe(true);
    });
    it('2階層', async () => {
      const fsNodes = [
        {
          ...defaultNode,
          isSelected: false,
          children: [
            {
              ...defaultNode,
              id: 'test2',
              isSelected: false,
            },
          ],
        },
      ];
      const result = await updateClickFileNodeState('test2', fsNodes);
      expect(result[0].children![0].isSelected).toBe(true);
    });
  });
  describe('選択したパス以外をfalseにすること', () => {
    it('2階層', async () => {
      const fsNodes = [
        {
          ...defaultNode,
          isSelected: false,
          children: [
            {
              ...defaultNode,
              id: 'test2',
              isSelected: false,
            },
            {
              ...defaultNode,
              id: 'test3',
              isSelected: true,
            },
          ],
        },
      ];
      const result = await updateClickFileNodeState('test2', fsNodes);
      expect(result[0].children![0].isSelected).toBe(true);
      expect(result[0].children![1].isSelected).toBe(false);
    });
  });
});
