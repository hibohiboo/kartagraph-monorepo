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
      await conn.execute(`CREATE NODE TABLE User(name STRING, age INT64, PRIMARY KEY (name))`);
      await conn.execute(`CREATE (u:User {name: 'Alice', age: 35});`);
      const res = await conn.execute(`MATCH (a:User) RETURN a.*;`);
      const res_json = JSON.parse(res.table.toString());
      console.log(res_json);
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
