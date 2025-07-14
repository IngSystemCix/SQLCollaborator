import sql from "mssql";

interface SQLServerConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

export const connectSQLServer = async (config: SQLServerConfig) => {
  const pool = await sql.connect({
    user: config.user,
    password: config.password,
    server: config.host,
    database: config.database,
    port: config.port ?? 1433,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  });

  return pool;
};

export const getSQLServerSchema = async (config: SQLServerConfig) => {
  const pool = await connectSQLServer(config);

  const tablesResult = await pool.request().query(`
    SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_TYPE = 'BASE TABLE'
  `);

  const schema: Record<string, any[]> = {};

  for (const row of tablesResult.recordset) {
    const tableName = row.TABLE_NAME;
    const columnsResult = await pool.request()
      .input('table', sql.VarChar, tableName)
      .query(`
        SELECT COLUMN_NAME, DATA_TYPE 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = @table
      `);

    schema[tableName] = columnsResult.recordset;
  }

  await pool.close();
  return schema;
};

export const executeSQLServerQuery = async (config: SQLServerConfig, query: string) => {
  const pool = await connectSQLServer(config);
  try {
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    return { error: (err as Error).message };
  } finally {
    await pool.close();
  }
};
