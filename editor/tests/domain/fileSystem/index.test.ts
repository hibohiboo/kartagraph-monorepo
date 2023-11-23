import { getDirectoryHandle } from '@kaminiten-editor/domain/fileSystem';
import { MyFileSystemDirectoryHandle } from '@kaminiten-editor/domain/fileSystem/types';

/**
 * getDirectoryHandleのユニットテスト
 */
describe('getDirectoryHandle', () => {
  it('rootHandleがnullの場合、nullを返す', async () => {
    const rootHandle = null;
    const path = '';
    const result = await getDirectoryHandle(rootHandle, path);
    expect(result).toBeNull();
  });
  it('rootHandleが存在する場合、handleを返す', async () => {
    const rootHandleMock = {
      getDirectoryHandle: jest.fn(() => rootHandleMock),
      values: jest.fn(),
    } as unknown as MyFileSystemDirectoryHandle;
    const path = '';
    const result = await getDirectoryHandle(rootHandleMock, path);
    expect(result).toEqual(rootHandleMock);
  });
  describe('pathの回数呼ぶ', () => {
    it('1階層', async () => {
      const rootHandleMock = {
        getDirectoryHandle: jest.fn(() => rootHandleMock),
        values: jest.fn(),
      } as unknown as MyFileSystemDirectoryHandle;
      const mockCallback = rootHandleMock.getDirectoryHandle as jest.Mock;
      const path = 'test';
      await getDirectoryHandle(rootHandleMock, path);
      expect(mockCallback.mock.calls).toHaveLength(1);
    });
    it('2階層', async () => {
      const rootHandleMock = {
        getDirectoryHandle: jest.fn(() => rootHandleMock),
        values: jest.fn(),
      } as unknown as MyFileSystemDirectoryHandle;
      const mockCallback = rootHandleMock.getDirectoryHandle as jest.Mock;
      const path = 'test/sample';
      await getDirectoryHandle(rootHandleMock, path);
      expect(mockCallback.mock.calls).toHaveLength(2);
      expect(mockCallback).toHaveBeenCalledWith('test');
      expect(mockCallback).toHaveBeenLastCalledWith('sample');
    });
  });
});
