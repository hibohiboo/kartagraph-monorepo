declare module '@kuzu/kuzu-wasm' {
  export default function kuzu_wasm(): Promise<Kuzu>;

  export interface Kuzu {
    Database: () => Promise<Database>;
    Connection: (db: Database) => Promise<Connection>;
    FS: {
      writeFile: (path: string, content: string) => void;
      readFile: <E extends 'binary' | 'utf8'>(path: string, options: { encoding: E }) => E extends 'utf8' ? string : Uint8Array;
    };
  }

  export interface Database {
    close: () => void;
  }

  export interface Connection {
    execute: (query: string) => Promise<QueryResult>;
  }

  export interface QueryResult {
    table: {
      toString: () => string;
    };
  }
}
