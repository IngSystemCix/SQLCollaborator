import mysql from 'mysql2/promise';

interface MySQLConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

export const connectMySQL = async (config: MySQLConfig) => {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port ?? 3306, // Valor por defecto
  });
};

export const getMySQLSchema = async (config: MySQLConfig) => {
  const connection = await connectMySQL(config);

  const [tables] = await connection.query(`
    SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = ?
  `, [config.database]);

  const schema: Record<string, any[]> = {};

  for (const row of tables as any[]) {
    const tableName = row.TABLE_NAME;
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME, DATA_TYPE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?
    `, [tableName, config.database]);

    schema[tableName] = columns as any[];
  }

  await connection.end();
  return schema;
};

export const executeMySQLQuery = async (config: MySQLConfig, query: string) => {
  const connection = await connectMySQL(config);
  try {
    const [results] = await connection.query(query);
    return results;
  } catch (err) {
    return { error: (err as Error).message };
  } finally {
    await connection.end();
  }
};
