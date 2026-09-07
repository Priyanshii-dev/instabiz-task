import { Pool } from 'pg';
import { env } from './env';

/**
 * A single shared PostgreSQL connection pool for the whole app.
 * All models query through this pool instead of creating their own clients.
 */
export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.pgSsl ? { rejectUnauthorized: false } : undefined,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error', err);
  process.exit(1);
});

export async function testConnection(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log(' PostgreSQL connected');
  } finally {
    client.release();
  }
}
