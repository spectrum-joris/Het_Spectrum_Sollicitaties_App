import { createClient } from '@libsql/client';

let client = null;

export function getDbClient() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      throw new Error('TURSO_DATABASE_URL is not defined');
    }

    client = createClient({
      url,
      authToken: authToken || undefined
    });

    console.log('✓ Turso database client initialized');
  }

  return client;
}

export async function executeQuery(sql, params = []) {
  const db = getDbClient();
  try {
    const result = await db.execute({ sql, args: params });
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function executeTransaction(queries) {
  const db = getDbClient();
  try {
    const results = await db.batch(queries.map(q => ({
      sql: q.sql,
      args: q.params || []
    })));
    return results;
  } catch (error) {
    console.error('Database transaction error:', error);
    throw error;
  }
}
