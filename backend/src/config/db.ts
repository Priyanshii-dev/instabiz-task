import { Pool } from 'pg';
import { env } from './env';

/**
 * A single shared PostgreSQL connection pool for the whole app.
 * All models query through this pool instead of creating their own clients.
 */
export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.pgSsl ? { rejectUnauthorized: false } : undefined,
  max: 1,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error', err);
});

export async function testConnection(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log('PostgreSQL connected');
  } finally {
    client.release();
  }
}