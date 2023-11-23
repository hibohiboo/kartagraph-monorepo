import { FileNodeInfo, MyFileSystemDirectoryHandle } from './types';

let rootHandle: MyFileSystemDirectoryHandle;
export async function getRootDirectoryHandle() {
  if (rootHandle) return rootHandle;
  try {
    rootHandle = await window.showDirectoryPicker();
    if (!rootHandle) return null;
    return rootHandle;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const readDirectory = async (
  handle: MyFileSystemDirectoryHandle | null,
  parentDirPath: string,
) => {
  if (!handle) return [];
  const files = await handle.values();
  const ret: FileNodeInfo[] = [];
  for await (const file of files) {
    ret.push({ name: file.name, kind: file.kind, dirPath: parentDirPath });
  }
  return ret;
};
export async function getDirectoryHandle(
  rootHandle: MyFileSystemDirectoryHandle | null,
  path: string,
) {
  if (!rootHandle) return null;
  if (path === '') return rootHandle;
  try {
    const dirs = path.split('/');
    const handle = dirs.reduce(async (acc, dir: string) => {
      const parentHandle = await acc;
      const handle = await parentHandle.getDirectoryHandle(dir);
      return handle;
    }, Promise.resolve(rootHandle));
    if (!handle) return null;
    return handle;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function readFile(
  handle: MyFileSystemDirectoryHandle,
  filename: string,
) {
  const fileHandle = await handle.getFileHandle(filename);
  const file = await fileHandle.getFile();
  return file;
}
