import kuzu_wasm from '@kuzu/kuzu-wasm';
import { InteractiveNvlWrapper } from '@neo4j-nvl/react';
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    (async () => {
      const kuzu = await kuzu_wasm();
      const db = await kuzu.Database();
      const conn = await kuzu.Connection(db);
      await conn.execute(`
        CREATE NODE TABLE User(name STRING, age INT64, PRIMARY KEY (name));
        CREATE (u:User {name: 'Alice', age: 35});`);
      const res = await conn.execute(`MATCH (a:User) RETURN a.*;`);
      const res_json = JSON.parse(res.table.toString());
      console.log(res_json);
      // get remote csv to wasm filesystem
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
      console.log('response', JSON.parse(response.table.toString()));
    })();
  }, []);

  return (
    <>
      <InteractiveNvlWrapper
        nvlOptions={{ useWebGL: false, initialZoom: 2.6 }}
        nodes={[
          { id: '0', caption: 'graphs' },
          { id: '1', caption: 'everywhere' },
        ]}
        rels={[{ from: '0', to: '1', id: '10', caption: 'are' }]}
        mouseEventCallbacks={{
          onZoom: true,
          onPan: true,
        }}
      />
    </>
  );
}

export default App;
