import { connectMySQL, getMySQLSchema, executeMySQLQuery } from "./connectors/mysql";
import { connectPostgreSQL, getPostgreSQLSchema, executePostgreSQLQuery } from "./connectors/postgresql";
import { connectSQLite, getSQLiteSchema, executeSQLiteQuery } from "./connectors/sqlite";
import { connectSQLServer, getSQLServerSchema, executeSQLServerQuery } from "./connectors/sqlserver";

export interface DBConfig {
  type: "mysql" | "postgres" | "sqlite" | "mssql";
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  filePath?: string; // solo para SQLite
}

export const createDBConnection = async (config: DBConfig) => {
  switch (config.type) {
    case "mysql":
      return await connectMySQL(config);
    case "postgres":
      return await connectPostgreSQL(config);
    case "sqlite":
      return connectSQLite(config);
    case "mssql":
      return await connectSQLServer(config);
    default:
      throw new Error("Unsupported database type");
  }
};

export const getSchema = async (config: DBConfig) => {
  switch (config.type) {
    case "mysql":
      return await getMySQLSchema(config);
    case "postgres":
      return await getPostgreSQLSchema(config);
    case "sqlite":
      return await getSQLiteSchema(config);
    case "mssql":
      return await getSQLServerSchema(config);
    default:
      throw new Error("Unsupported database type");
  }
};

export const executeQuery = async (config: DBConfig, query: string) => {
  switch (config.type) {
    case "mysql":
      return await executeMySQLQuery(config, query);
    case "postgres":
      return await executePostgreSQLQuery(config, query);
    case "sqlite":
      return await executeSQLiteQuery(config, query);
    case "mssql":
      return await executeSQLServerQuery(config, query);
    default:
      throw new Error("Unsupported database type");
  }
};
