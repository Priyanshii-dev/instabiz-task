import fs from 'fs';
import path from 'path';
import { pool, testConnection } from '../config/db';

/**
 * Minimal migration runner: executes schema.sql against the configured database.
 * Usage: npm run migrate
 */
async function migrate() {
  await testConnection();
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  await pool.query(sql);

  console.log('✅ Migration complete: admins & enquiries tables ready');
  await pool.end();
}

migrate().catch((err) => {
  console.error(' Migration failed', err);
  process.exit(1);
});
