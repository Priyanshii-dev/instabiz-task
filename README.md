# InstaBizWeb

InstaBizWeb is a full-stack business website with a public-facing marketing experience, a contact
form, a PostgreSQL-backed API, and a JWT-protected admin dashboard for managing enquiries.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL |
| Auth | JWT + bcryptjs |
| Validation | Zod |

## Repository layout

```text
README.md            Project overview and setup guide
backend/             Express + TypeScript API
frontend/            Next.js marketing site + admin dashboard
```

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL instance
- Access to a local or deployed backend URL for the frontend

## Quick start

### 1. Backend

```bash
cd backend
npm install
npm run migrate
npm run seed:admin
npm run dev
```

The backend runs on `http://localhost:5000` by default.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` by default.

### 3. Run the full app

1. Open `http://localhost:3000/contact` and submit an enquiry.
2. Open `http://localhost:3000/admin`.
3. Sign in with the seeded admin credentials from `backend/.env`.
4. Use the dashboard to search, view, edit, and delete enquiries.

## Environment files

### Backend

The workspace already includes `backend/.env`, and the project also provides `backend/.env.example` as a reference.

Required backend variables include:

- `PORT`
- `NODE_ENV`
- `FRONTEND_URL`
- `DATABASE_URL`
- `PGSSL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `SEED_ADMIN_NAME`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`

### Frontend

The workspace already includes `frontend/.env.local`, and `frontend/.env.local.example` is available as a template.

The key variable is:

- `NEXT_PUBLIC_API_BASE_URL` (for example `http://localhost:5000/api`)

## API overview

### Public routes

- `POST /api/enquiries` — submit a new enquiry
- `GET /api/health` — health check

### Admin routes

- `POST /api/auth/login` — admin login
- `GET /api/auth/me` — current admin profile
- `GET /api/enquiries` — list enquiries with filters
- `GET /api/enquiries/:id` — fetch one enquiry
- `PUT /api/enquiries/:id` — update an enquiry
- `DELETE /api/enquiries/:id` — delete an enquiry

All admin routes require `Authorization: Bearer <token>`.

## Project structure

```text
backend/
  src/
    app.ts
    server.ts
    common/
    config/
    db/
    modules/
    routes/

frontend/
  src/
    app/
    components/
    context/
    lib/
```

## Deployment notes

- Deploy the backend to a service that supports Node.js and PostgreSQL.
- Set `DATABASE_URL`, `JWT_SECRET`, and `SEED_ADMIN_*` values on the backend environment.
- Deploy the frontend to Vercel or another Next.js host.
- Set `NEXT_PUBLIC_API_BASE_URL` to the deployed backend API URL.

## Notes

- The backend already contains local environment configuration in this workspace, so you can update it directly for local testing.
- The seeded admin account is created by `npm run seed:admin` using the `SEED_ADMIN_*` variables.
- The frontend stores the JWT in browser storage and automatically attaches it for protected admin API calls.
