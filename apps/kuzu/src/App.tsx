import kuzu_wasm, { Connection, Kuzu } from '@kuzu/kuzu-wasm';
import Cytoscape from 'cytoscape';
import { useEffect, useRef, useState } from 'react';
import { CytoscapeComponent } from './shared/ui';

function App() {
  const [elements, setNElements] = useState<{ data: { id?: string; source?: string; target?: string; label?: string } }[]>([]);
  const cyref = useRef<Cytoscape.CoreLayout | null>(null);
  const conRef = useRef<Connection | null>(null);
  const kuzuRef = useRef<Kuzu | null>(null);
  const draw = async () => {
    if (!conRef.current) return;
    // Execute Cypher query
    const response = await conRef.current.execute(
      `
   MATCH (a:User)
   RETURN *;
   `,
    );
    const users = !response.table ? [] : JSON.parse(response.table.toString());
    type ID = { offset: string; table: string };
    const getId = (id: ID): string => `id_${id.table}_${id.offset}`;
    const nodes = users.map(({ a }: { a: { _ID: ID; name: string } }) => ({ data: { id: getId(a._ID), label: a.name } }));

    const relsResponse = await conRef.current.execute(
      `
   MATCH (a:User)-[r:Follows]->(b:User)
   RETURN *;
   `,
    );
    const rels = !relsResponse.table ? [] : JSON.parse(relsResponse.table.toString());

    const relsData = rels.map(
      ({ r }: { a: { _ID: ID; name: string }; r: { _ID: ID; _SRC: ID; _DST: ID; since: string }; b: { _ID: ID; name: string } }) => ({
        data: {
          source: getId(r._SRC),
          target: getId(r._DST),
          id: getId(r._ID),
          label: r.since,
        },
      }),
    );
    setNElements([...nodes, ...relsData]);
    setTimeout(() => {
      if (cyref.current) cyref.current.layout({ name: 'grid' }).run();
    }, 0);
  };
  useEffect(() => {
    (async () => {
      const kuzu = await kuzu_wasm();
      const db = await kuzu.Database();
      const conn = await kuzu.Connection(db);
      conRef.current = conn;
      kuzuRef.current = kuzu;

      kuzu.FS.writeFile('/follows.csv', await (await fetch('/data/follows.csv')).text());
      kuzu.FS.writeFile('/city.csv', await (await fetch('/data/city.csv')).text());
      kuzu.FS.writeFile('/lives-in.csv', await (await fetch('/data/lives-in.csv')).text());
      kuzu.FS.writeFile('/user.csv', await (await fetch('/data/user.csv')).text());

      // Create schema
      await conn.execute('CREATE NODE TABLE User(name STRING, age INT64, PRIMARY KEY (name))');
      await conn.execute('CREATE NODE TABLE City(name STRING, population INT64, PRIMARY KEY (name))');
      await conn.execute('CREATE REL TABLE Follows(FROM User TO User, since INT64)');
      await conn.execute('CREATE REL TABLE LivesIn(FROM User TO City)');

      // Insert data
      await conn.execute('COPY User FROM "/user.csv"');
      await conn.execute('COPY City FROM "/city.csv"');
      await conn.execute('COPY Follows FROM "/follows.csv"');
      await conn.execute('COPY LivesIn FROM "/lives-in.csv"');

      // Execute Cypher query
      await draw();
    })();
  }, []);
  return (
    <>
      <CytoscapeComponent
        elements={elements}
        cy={(cy) => {
          cyref.current = cy;
        }}
        layout={{ name: 'grid' }}
        wheelSensitivity={0.1}
        style={{ width: '600px', height: '600px' }}
      />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(e);
          if (!conRef.current) return;
          const form = new FormData(e.currentTarget);
          const userName = form.get('username') || '';
          if (!userName) return;
          await conRef.current.execute(`CREATE (u:User {name: '${userName}', age: 10});`);
          await draw();
          return;
        }}
      >
        <input type="text" name="username" />
        <button type="submit">ユーザ追加</button>
      </form>
      <button
        onClick={async () => {
          if (!conRef.current || !kuzuRef.current) return;
          // await conRef.current.execute(`EXPORT DATABASE '/bakcup.csv' (format="csv", header=true);`);
          //
          await conRef.current.execute(`COPY (MATCH (u:User) RETURN u.*) TO '/bakcup.csv' (header=true);`);

          const contents = kuzuRef.current.FS.readFile('/bakcup.csv', { encoding: 'utf8' });
          console.log('contents', contents);
        }}
      >
        保存
      </button>
    </>
  );
}

export default App;
