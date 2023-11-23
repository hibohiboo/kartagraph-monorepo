export interface FileNodeInfo {
  name: string;
  kind: string;
  dirPath: string;
}
export interface FileNodeState extends FileNodeInfo {
  id: string; // dirPath + name: slash区切りのpath ex) dir1/dir2/file1
  isExpanded: boolean;
  isSelected: boolean;
  children?: FileNodeState[];
}
export interface MyFileSystemDirectoryHandle extends FileSystemDirectoryHandle {
  values(): AsyncIterableIterator<FileSystemFileHandle>;
  getDirectoryHandle(
    name: string,
    options?: FileSystemGetDirectoryOptions | undefined,
  ): Promise<MyFileSystemDirectoryHandle>;
}
declare global {
  interface Window {
    showDirectoryPicker(): Promise<MyFileSystemDirectoryHandle>;
  }
}
