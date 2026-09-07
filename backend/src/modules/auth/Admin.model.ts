import { pool } from '../../config/db';
import { Admin } from '../../common/types';

export const AdminModel = {
  async findByEmail(email: string): Promise<Admin | null> {
    const { rows } = await pool.query<Admin>(
      'SELECT * FROM admins WHERE email = $1',
      [email],
    );
    return rows[0] ?? null;
  },

  async findById(id: number): Promise<Admin | null> {
    const { rows } = await pool.query<Admin>(
      'SELECT * FROM admins WHERE id = $1',
      [id],
    );
    return rows[0] ?? null;
  },
};
