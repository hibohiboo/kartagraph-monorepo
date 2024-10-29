import { getGraphDbClient } from '../../../shared/lib/graphdb/kuzu';

export const initDb = async () => {
  const conn = await getGraphDbClient();

  // Create schema
  await conn.execute('CREATE NODE TABLE User(name STRING, age INT64, PRIMARY KEY (name))');
  await conn.execute('CREATE NODE TABLE City(name STRING, population INT64, PRIMARY KEY (name))');
  await conn.execute('CREATE REL TABLE Follows(FROM User TO User, since INT64)');
  await conn.execute('CREATE REL TABLE LivesIn(FROM User TO City)');
};
export const createUserNode = async (name: string, age: number) => {
  const conn = await getGraphDbClient();
  await conn.execute(`CREATE (u:User {name: '${name}',age: ${age}});`);
};
