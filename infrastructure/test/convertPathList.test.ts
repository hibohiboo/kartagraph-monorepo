import { convertPathList } from '../util/convertPathList';

describe('convertPathList', () => {
  test('pathを/区切りのパスのリストに変換する', () => {
    const path = '/api/v1/hoge';
    const pathListWithSlash = convertPathList(path);
    expect(pathListWithSlash).toEqual(['/api', '/api/v1', '/api/v1/hoge']);
  });
});
