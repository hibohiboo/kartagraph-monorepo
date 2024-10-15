declare module '@kuzu/kuzu-wasm' {
  export default function kuzu_wasm(): Promise<Kuzu>;

  export interface Kuzu {
    Database: () => Promise<Database>;
    Connection: (db: Database) => Promise<Connection>;
    FS: {
      writeFile: (path: string, content: string) => void;
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
