import { pool } from '../../config/db';
import { Enquiry, PaginatedResult } from '../../common/types';
import {
  CreateEnquiryInput,
  ListQueryInput,
  UpdateEnquiryInput,
} from './enquiry.validator';

export const EnquiryModel = {
  async create(input: CreateEnquiryInput): Promise<Enquiry> {
    const { rows } = await pool.query<Enquiry>(
      `INSERT INTO enquiries (full_name, email, phone, company_name, service, message)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        input.full_name,
        input.email,
        input.phone,
        input.company_name,
        input.service,
        input.message,
      ],
    );
    return rows[0];
  },

  async findAll(query: ListQueryInput): Promise<PaginatedResult<Enquiry>> {
    const { page, limit, search, service, status } = query;
    const offset = (page - 1) * limit;
    const conditions: string[] = [];
    const params: unknown[] = [];
    if (search) {
      params.push(`%${search}%`);
      conditions.push(
        `(full_name ILIKE $${params.length} OR email ILIKE $${params.length} OR company_name ILIKE $${params.length})`,
      );
    }
    if (service) {
      params.push(service);
      conditions.push(`service = $${params.length}`);
    }
    if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }
    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';
    const countResult = await pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM enquiries ${whereClause}`,
      params,
    );
    const total = parseInt(countResult.rows[0].count, 10);
    params.push(limit, offset);
    const { rows } = await pool.query<Enquiry>(
      `SELECT * FROM enquiries ${whereClause} ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params,
    );
    return {
      items: rows,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  },

  async findById(id: number): Promise<Enquiry | null> {
    const { rows } = await pool.query<Enquiry>(
      'SELECT * FROM enquiries WHERE id = $1',
      [id],
    );
    return rows[0] ?? null;
  },

  async update(id: number, input: UpdateEnquiryInput): Promise<Enquiry | null> {
    const fields = Object.entries(input).filter(
      ([, value]) => value !== undefined,
    );
    if (fields.length === 0) return this.findById(id);
    const setClause = fields
      .map(([key], index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = fields.map(([, value]) => value);
    const { rows } = await pool.query<Enquiry>(
      `UPDATE enquiries SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id],
    );
    return rows[0] ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM enquiries WHERE id = $1', [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  },
};
