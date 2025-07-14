import { Client } from "pg";

interface PostgreSQLConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

export const connectPostgreSQL = async (config: PostgreSQLConfig) => {
  const client = new Client({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
  });
  await client.connect();
  return client;
};

export const getPostgreSQLSchema = async (config: PostgreSQLConfig) => {
  const client = await connectPostgreSQL(config);

  const tablesResult = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  `);

  const schema: Record<string, any[]> = {};

  for (const row of tablesResult.rows) {
    const tableName = row.table_name;

    const columnsResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = $1;
    `, [tableName]);

    schema[tableName] = columnsResult.rows;
  }

  await client.end();
  return schema;
};

export const executePostgreSQLQuery = async (config: PostgreSQLConfig, query: string) => {
  const client = await connectPostgreSQL(config);
  try {
    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    return { error: (err as Error).message };
  } finally {
    await client.end();
  }
};
