import kuzu_wasm from '@kuzu/kuzu-wasm';
import type { Connection, Kuzu } from '@kuzu/kuzu-wasm';

let conn: Connection | null = null;
let kuzu: Kuzu | null = null;
export const getGraphDbClient = async () => {
  if (conn != null) {
    return conn;
  }
  kuzu = await kuzu_wasm();
  const db = await kuzu.Database();
  conn = await kuzu.Connection(db);
  return conn;
};

export const getKuzu = async () => {
  if (kuzu != null) {
    return kuzu;
  }
  kuzu = await kuzu_wasm();
  return kuzu;
};
