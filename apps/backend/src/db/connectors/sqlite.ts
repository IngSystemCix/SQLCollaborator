import Database from "better-sqlite3";

interface SQLiteConfig {
  filePath?: string;
}

export const connectSQLite = (config: SQLiteConfig) => {
  const db = new Database(config.filePath || "default.db");
  return db;
};

export const getSQLiteSchema = (config: SQLiteConfig) => {
  const db = connectSQLite(config);

  const tables = db.prepare(`
    SELECT name 
    FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%';
  `).all() as { name: string }[];

  const schema: Record<string, any[]> = {};

  for (const table of tables) {
    const columns = db.prepare(`PRAGMA table_info(${table.name});`).all() as { name: string; type: string }[];
    schema[table.name] = columns.map(col => ({
      COLUMN_NAME: col.name,
      DATA_TYPE: col.type,
    }));
  }

  return schema;
};

export const executeSQLiteQuery = (config: SQLiteConfig, query: string) => {
  const db = connectSQLite(config);

  try {
    const stmt = db.prepare(query);

    if (query.trim().toLowerCase().startsWith("select")) {
      return stmt.all(); // Devuelve filas
    } else {
      const info = stmt.run(); // Para INSERT, UPDATE, DELETE
      return { changes: info.changes, lastInsertRowid: info.lastInsertRowid };
    }
  } catch (err) {
    return { error: (err as Error).message };
  }
};
