# InstaBizWeb — Full Stack Developer Intern Assignment

A complete business website for InstaBizWeb (Home, About, Services, Why Choose Us, Contact/Enquiry)
with a working enquiry form, a REST API backend, PostgreSQL persistence, JWT admin authentication,
and an admin panel for full enquiry CRUD.

## Tech stack
| Layer     | Technology |
|-----------|------------|
| Frontend  | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend   | Node.js, Express.js, TypeScript, REST APIs |
| Database  | PostgreSQL (raw `pg` driver, hand-written schema/migrations) |
| Auth      | JWT (jsonwebtoken) + bcrypt password hashing |

## Repository layout
```
backend/    Express + TypeScript API (see backend/README.md)
frontend/   Next.js + TypeScript + Tailwind site + admin panel (see frontend/README.md)
```

## Quick start (local development)

**1. Database**
Create a local PostgreSQL database (or use a free hosted one, e.g. Neon/Supabase) and note its
connection string.

**2. Backend**
```bash
cd backend
cp .env.example .env        # fill in DATABASE_URL, JWT_SECRET, SEED_ADMIN_*
npm install
npm run migrate             # creates admins + enquiries tables
npm run seed:admin          # creates the first admin login
npm run dev                 # http://localhost:5000
```

**3. Frontend**
```bash
cd frontend
cp .env.local.example .env.local   # NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
npm install
npm run dev                        # http://localhost:3000
```

**4. Try it**
- Visit `http://localhost:3000/contact` and submit an enquiry.
- Visit `http://localhost:3000/admin` → redirected to the login screen → sign in with the
  `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` you set → view, search/filter, edit, and delete
  enquiries from the dashboard.

## Architecture

```
 Visitor's browser
      │  fills Contact form
      ▼
 Next.js frontend (React)
      │  POST /api/enquiries  (fetch, JSON)
      ▼
 Express REST API  ──▶  Zod validation ──▶  PostgreSQL (enquiries table)
      ▲
      │  Authorization: Bearer <JWT>
 Admin (Next.js /admin) ──▶ /api/auth/login, /api/enquiries (GET/PUT/DELETE)
```

- **Frontend → Backend**: a single typed `fetch` wrapper (`frontend/src/lib/api.ts`) is the only
  place that talks to the API; every page/component calls through it.
- **Backend layering**: `routes → middleware (auth/validation) → controllers → models (SQL)`, so
  no controller writes raw SQL and no route skips validation.
- **Auth**: admin logs in with email + password → bcrypt-compare against the stored hash → JWT
  issued → frontend stores it and sends it on every admin request → `requireAuth` middleware
  verifies it on the backend before touching enquiry data.

## AI-Assisted Development

This project was built with the help of **Claude** (Anthropic).

- **How it was used**: Claude was used to scaffold the full project structure (backend REST API,
  PostgreSQL schema, JWT auth, and the Next.js frontend + admin panel) in one pass, following the
  assignment's stack requirements and a consistent, reusable code structure (shared UI components,
  a single API client, a shared Zod validation layer mirrored on both frontend and backend).
- **AI-assisted parts**: route/controller/model layering on the backend, the `EnquiryForm`,
  `EnquiryTable`, `ProtectedRoute`, and `AuthContext` on the frontend, and the Tailwind design system
  (Button/Input/Select/Card/Badge primitives).
- **What to fill in before submission**: replace this bullet with a concrete example of a bug you
  personally found and fixed in the AI-generated code (e.g. a validation edge case, a pagination
  off-by-one, a CORS misconfiguration), as the assignment requires — this keeps the README honest
  about your own debugging/understanding, not just the AI's output.

## Deployment checklist (per assignment requirements)
- [ ] Reply on the original assignment email thread to start the 48-hour window.
- [ ] Deploy backend (Render/Railway) with a managed PostgreSQL database.
- [ ] Deploy frontend (Vercel) pointing at the deployed backend's `/api` URL.
- [ ] Confirm the full flow works live: enquiry form → API → database → admin login →
      view/edit/update/delete.
- [ ] Collect: GitHub repo link, Live Website URL, Admin Panel URL (`/admin`), admin login
      credentials, and this README.
