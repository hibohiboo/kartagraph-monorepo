import { updateCollapseFileNodeState } from '@kartagraph-editor/domain/fileTree/collapse';
const defaultNode = {
  id: 'test',
  kind: 'directory',
  name: 'test',
  dirPath: '',
  isExpanded: false,
  isSelected: false,
};

describe('updateCollapseFileNodeState', () => {
  describe('選択したパスのフォルダを閉じること', () => {
    it('1階層', async () => {
      const fsNodes = {
        ...defaultNode,
        isExpanded: true,
      };

      const result = await updateCollapseFileNodeState(fsNodes, 'test');
      expect(result.isExpanded).toBe(false);
    });
    it('2階層', async () => {
      const fsNodes = {
        ...defaultNode,
        isExpanded: true,
        isSelected: false,
        children: [
          {
            ...defaultNode,
            id: 'test/sample',
            name: 'sample',
            dirPath: 'test',
          },
          {
            ...defaultNode,
            id: 'test/sample2',
            kind: 'directory',
            name: 'sample2',
            dirPath: 'test',
            isExpanded: true,
          },
        ],
      };
      const result = await updateCollapseFileNodeState(fsNodes, 'test/sample2');
      expect(result.children![1].isExpanded).toBe(false);
    });
  });
});
