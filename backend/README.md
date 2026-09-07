# InstaBizWeb — Backend (Express + TypeScript + PostgreSQL)

REST API for the InstaBizWeb website: public enquiry submission + JWT-protected admin CRUD.

## Stack

- Node.js + Express + TypeScript
- PostgreSQL (raw `pg` driver, no ORM — see `src/db/schema.sql`)
- JWT auth (`jsonwebtoken`) + bcrypt password hashing
- Zod request validation, centralised error handling, rate limiting, helmet, CORS

## Folder structure

```
src/
  config/        env + db pool
  db/            schema.sql, migrate.ts, seedAdmin.ts
  models/        data-access layer (SQL lives here only)
  controllers/   request/response handling
  routes/        route -> controller wiring
  middleware/    auth, validation, rate limiting, error handling
  validators/    zod schemas (shared shape for create/update/list)
  utils/         AppError, asyncHandler, jwt, password, apiResponse
  types/         shared TypeScript types
  app.ts         express app (middleware pipeline)
  server.ts      entrypoint
```

## Setup

```bash
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, etc.
npm install
npm run migrate        # creates admins + enquiries tables
npm run seed:admin     # creates the first admin login from SEED_ADMIN_* env vars
npm run dev            # http://localhost:5000
```

## API

| Method | Route              | Auth | Description                                         |
| ------ | ------------------ | ---- | --------------------------------------------------- |
| POST   | /api/auth/login    | –    | Admin login, returns JWT                            |
| GET    | /api/auth/me       | ✅   | Current admin profile                               |
| POST   | /api/enquiries     | –    | Public: submit enquiry form                         |
| GET    | /api/enquiries     | ✅   | List (supports `?page&limit&search&service&status`) |
| GET    | /api/enquiries/:id | ✅   | Single enquiry                                      |
| PUT    | /api/enquiries/:id | ✅   | Update enquiry                                      |
| DELETE | /api/enquiries/:id | ✅   | Delete enquiry                                      |
| GET    | /api/health        | –    | Health check                                        |

Admin routes expect `Authorization: Bearer <token>`.

## Deployment (Render / Railway)

1. Provision a PostgreSQL instance, copy its connection string into `DATABASE_URL`.
2. Set `PGSSL=true` for most managed Postgres providers.
3. Set `FRONTEND_URL` to your deployed frontend origin (for CORS).
4. Build command: `npm install && npm run build && npm run migrate && npm run seed:admin`
   Start command: `npm start`
