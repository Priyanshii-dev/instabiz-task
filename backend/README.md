# InstaBizWeb Backend

This backend provides the REST API for the InstaBizWeb website. It handles public enquiry submission,
admin authentication, and protected CRUD operations for enquiries in PostgreSQL.

## Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT authentication
- Zod validation
- Helmet, CORS, rate limiting, and centralized error handling

## Project structure

```text
src/
  app.ts               Express app setup and global middleware
  server.ts            Server entrypoint
  common/
    middleware/        auth, validation, rate limiting, error handling
    types/             shared TypeScript types
    utils/             AppError, asyncHandler, jwt, password, apiResponse
  config/
    db.ts              PostgreSQL pool config
    env.ts             environment validation
  db/
    migrate.ts         schema creation script
    schema.sql         SQL schema
    seedAdmin.ts       creates the seeded admin account
  modules/
    auth/
      Admin.model.ts
      auth.controller.ts
      auth.routes.ts
      auth.validator.ts
    enquiry/
      Enquiry.model.ts
      enquiry.controller.ts
      enquiry.routes.ts
      enquiry.validator.ts
  routes/
    index.ts           route registration
```

## Scripts

```bash
npm run dev         # run the API in development mode
npm run build       # compile TypeScript
npm run start       # run the compiled app
npm run migrate     # create database tables
npm run seed:admin  # create the seeded admin account
```

## Environment variables

The workspace already contains a local `backend/.env`. You can also use `backend/.env.example` as a template.

Required values:

- `PORT` — default `5000`
- `NODE_ENV` — default `development`
- `FRONTEND_URL` — frontend origin used for CORS
- `DATABASE_URL` — PostgreSQL connection string
- `PGSSL` — set to `true` for managed PostgreSQL providers
- `JWT_SECRET` — secret used to sign tokens
- `JWT_EXPIRES_IN` — token lifetime
- `SEED_ADMIN_NAME`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`

## Local setup

```bash
cd backend
npm install
npm run migrate
npm run seed:admin
npm run dev
```

The API will be available at `http://localhost:5000`.

## API routes

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | No | Admin login and JWT generation |
| GET | `/api/auth/me` | Yes | Get current authenticated admin |
| POST | `/api/enquiries` | No | Submit a public enquiry |
| GET | `/api/enquiries` | Yes | List enquiries with filters |
| GET | `/api/enquiries/:id` | Yes | Get one enquiry |
| PUT | `/api/enquiries/:id` | Yes | Update an enquiry |
| DELETE | `/api/enquiries/:id` | Yes | Delete an enquiry |
| GET | `/api/health` | No | Health check |

Admin requests require the header:

```http
Authorization: Bearer <token>
```

## Deployment notes

1. Provision a PostgreSQL instance and set `DATABASE_URL` to the connection string.
2. Set `PGSSL=true` if your database provider requires it.
3. Set `FRONTEND_URL` to the deployed frontend origin so CORS accepts requests.
4. Build and run the app in production:

```bash
npm install
npm run build
npm run migrate
npm run seed:admin
npm start
```

## Notes

- This workspace already includes a local `.env` file, so you can update it directly for local testing.
- The seeded admin account is created from `SEED_ADMIN_*` values when `npm run seed:admin` is executed.
- The API returns JSON responses with a consistent success/error structure managed by the shared utilities.
