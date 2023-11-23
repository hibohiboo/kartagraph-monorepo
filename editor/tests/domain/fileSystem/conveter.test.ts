import { fileNodeStateToTreeNodeInfo } from '@kartagraph-editor/domain/fileSystem/conveter';

/**
 * fileNodeStateToTreeNodeInfoのユニットテスト
 */
describe('fileNodeStateToTreeNodeInfo', () => {
  const state = {
    id: 'test',
    kind: 'directory',
    name: 'test',
    dirPath: '',
    isExpanded: false,
    isSelected: false,
  };
  it('stateが存在する場合、TreeNodeInfoを返す', () => {
    const result = fileNodeStateToTreeNodeInfo(state);
    expect(result).toEqual({
      id: 'test',
      key: 'test',
      leaf: false,
      icon: 'pi pi-fw pi-folder',
      label: 'test',
      expanded: false,
      data: state,
    });
  });
  describe('leafがディレクトリではfalseになること', () => {
    it('kindがdirectoryの場合、leafがfalseになる', () => {
      const result = fileNodeStateToTreeNodeInfo(state);
      expect(result.leaf).toBe(false);
    });
    it('kindがfileの場合、leafがtrueになる', () => {
      const result = fileNodeStateToTreeNodeInfo({
        ...state,
        kind: 'file',
      });
      expect(result.leaf).toBe(true);
    });
  });
  describe('iconの設定が正しいこと', () => {
    it('ディレクトリが閉じている場合、iconがfolder-closeになる', () => {
      const result = fileNodeStateToTreeNodeInfo(state);
      expect(result.icon).toBe('pi pi-fw pi-folder');
    });

    it('ディレクトリが開いている場合、iconがfolder-openになる', () => {
      const result = fileNodeStateToTreeNodeInfo({
        ...state,
        isExpanded: true,
      });
      expect(result.icon).toBe('pi pi-fw pi-folder-open');
    });
    it('ファイルの場合、iconがdocumentになる', () => {
      const result = fileNodeStateToTreeNodeInfo({ ...state, kind: 'file' });
      expect(result.icon).toBe('pi pi-fw pi-file');
    });
  });
  describe('子要素が存在する場合、再帰的に解釈される', () => {
    // 再帰的なテストは難しいので、子要素が存在する場合のみテストする
    it('子要素が存在する場合、childNodeが存在する', () => {
      const result = fileNodeStateToTreeNodeInfo({
        ...state,
        children: [state],
      });
      expect(result.children).toHaveLength(1);
    });
  });
});
