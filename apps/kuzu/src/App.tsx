import { useEffect, useState } from 'react';
import kuzu_wasm from '@kuzu/kuzu-wasm';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

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
      kuzu.FS.writeFile(
        '/follows.csv',
        await (await fetch('https://raw.githubusercontent.com/kuzudb/kuzu/master/dataset/demo-db/csv/follows.csv')).text(),
      );
      kuzu.FS.writeFile('/city.csv', await (await fetch('https://raw.githubusercontent.com/kuzudb/kuzu/master/dataset/demo-db/csv/city.csv')).text());
      kuzu.FS.writeFile(
        '/lives-in.csv',
        await (await fetch('https://raw.githubusercontent.com/kuzudb/kuzu/master/dataset/demo-db/csv/lives-in.csv')).text(),
      );
      kuzu.FS.writeFile('/user.csv', await (await fetch('https://raw.githubusercontent.com/kuzudb/kuzu/master/dataset/demo-db/csv/user.csv')).text());

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
         MATCH (a:User)-[f:Follows]->(b:User)
         RETURN a.name, b.name, f.since;
         `,
      );
      // // const resObj = JSON.parse(response.table.toString());
      console.log('response', JSON.parse(response.table.toString()));

      // // httpfs
      // // https://docs.kuzudb.com/extensions/httpfs/
      // const resExt = await conn.execute(`INSTALL httpfs;LOAD EXTENSION httpfs;
      //   LOAD FROM "https://extension.kuzudb.com/dataset/test/city.csv"
      //   RETURN *;`);
      // // const resExt = await conn.execute(``);
      // if (resExt) {
      //   console.log('resExt', JSON.parse(resExt.table.toString()));
      // }
    })();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
