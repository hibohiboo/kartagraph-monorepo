/**
 * pathを/区切りのパスのリストに変換する
 * 例: /api/v1/hoge -> ['/api', '/api/v1', '/api/v1/hoge']
 * @param path
 */
export const convertPathList = (path: string): string[] => {
  const pathList = path.split('/').filter((value) => value !== '');
  const pathListWithSlash = pathList.map((value, index) => {
    return '/' + pathList.slice(0, index + 1).join('/');
  });
  return pathListWithSlash;
};
