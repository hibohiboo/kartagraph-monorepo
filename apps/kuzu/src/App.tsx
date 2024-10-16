import kuzu_wasm from '@kuzu/kuzu-wasm';
import Cytoscape from 'cytoscape';
import { useEffect, useRef, useState } from 'react';
import { CytoscapeComponent } from './shared/graph';
function App() {
  const [elements, setNElements] = useState<{ data: { id?: string; source?: string; target?: string; label?: string } }[]>([]);
  const cyref = useRef<Cytoscape.CoreLayout | null>(null);
  useEffect(() => {
    (async () => {
      const kuzu = await kuzu_wasm();
      const db = await kuzu.Database();
      const conn = await kuzu.Connection(db);

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
      const response = await conn.execute(
        `
         MATCH (a:User)
         RETURN *;
         `,
      );
      const users = JSON.parse(response.table.toString());
      type ID = { offset: string; table: string };
      const getId = (id: ID): string => `id_${id.table}_${id.offset}`;
      const nodes = users.map(({ a }: { a: { _ID: ID; name: string } }) => ({ data: { id: getId(a._ID), label: a.name } }));

      const relsResponse = await conn.execute(
        `
         MATCH (a:User)-[r:Follows]->(b:User)
         RETURN *;
         `,
      );
      const rels = JSON.parse(relsResponse.table.toString());

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
      if (cyref.current) {
        cyref.current.layout({ name: 'grid' }).run();
      }
    })();
  }, []);
  return (
    <CytoscapeComponent
      elements={elements}
      cy={(cy) => {
        cyref.current = cy;
      }}
      layout={{ name: 'grid' }}
      wheelSensitivity={0.1}
      style={{ width: '600px', height: '600px' }}
    />
  );
}

export default App;
