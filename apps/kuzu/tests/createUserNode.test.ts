/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import { createUserNode, initDb } from '../src/feature/user/model/create';
import { getGraphDbClient } from '../src/shared/lib/graphdb/kuzu';
import { initializeWebDatabase, initializeWebConnection } from './helper.mjs';

// https://qiita.com/Leech/items/5cd1e83253d0179b0cec
vi.mock('@kuzu/kuzu-wasm', async () => {
  const { default: originalModule } = (await vi.importActual('@kuzu/kuzu-wasm')) as any;
  // https://github.com/unswdb/kuzu-wasm/blob/main/packages/kuzu-wasm/src/index.js
  return {
    default: async () => {
      const m = await originalModule();
      const Database = () => initializeWebDatabase(m);
      const Connection = (...args: [any, number]) => initializeWebConnection(m, ...args);
      return {
        ...m,
        Database,
        Connection,
      };
    },
  };
});

describe('createUserNode', () => {
  beforeEach(async () => {
    await initDb();
  });
  afterEach(async () => {
    const conn = await getGraphDbClient();
    await conn.execute('MATCH (n) DETACH DELETE n');
  });
  test.each([
    ['test-1', 15],
    ['test-2', 20],
  ])('ユーザを作成できること: %s', async (name, age) => {
    await createUserNode(name, age);
    const conn = await getGraphDbClient();
    const result = await conn.execute('MATCH (u) RETURN (u)');
    const [ret] = getQueryData(result); // [ {"u": {"_ID":{"offset":"1","table":"0"},"_LABEL":"User","name":"test-2","age":"20","population":null}} ]

    expect(ret['u'].name).toBe(name);
    expect(ret['u'].age).toBe(`${age}`);
  });
});
function getQueryData(result: any) {
  if (!result.table) return [];

  return JSON.parse(result.table.toString());
}
