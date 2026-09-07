import bcrypt from 'bcryptjs';
import { pool } from '../config/db';

/**
 * Creates (or updates the password of) the initial admin account from env vars.
 * Usage: npm run seed:admin
 */
async function seedAdmin() {
  const name = process.env.SEED_ADMIN_NAME || 'Admin';
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@instabizweb.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

  const hashed = await bcrypt.hash(password, 10);

  const existing = await pool.query('SELECT id FROM admins WHERE email = $1', [
    email,
  ]);

  if (existing.rows.length > 0) {
    await pool.query(
      'UPDATE admins SET name = $1, password = $2, updated_at = NOW() WHERE email = $3',
      [name, hashed, email],
    );

    console.log(`✅ Existing admin updated: ${email}`);
  } else {
    await pool.query(
      'INSERT INTO admins (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashed],
    );

    console.log(`✅ Admin created: ${email}`);
  }

  await pool.end();
}

seedAdmin().catch((err) => {
  console.error('❌ Seeding admin failed', err);
  process.exit(1);
});
