# InstaBizWeb — Frontend (Next.js 14 + TypeScript + Tailwind CSS)

Public marketing site (Home, About, Services, Why Choose Us, Contact/Enquiry) plus a separate
`/admin` panel (login, dashboard, enquiry detail/edit) built with the Next.js App Router.

## Folder structure

```
src/
  app/
    (site)/            public pages, wrapped with Navbar + Footer via layout.tsx
      about/ services/ why-choose-us/ contact/
    admin/              separate app area, NO public navbar/footer
      login/
      dashboard/        list (search, filter, pagination)
      dashboard/[id]/   view, edit, update, delete
      page.tsx          redirects /admin -> /admin/login
      layout.tsx        wraps AuthProvider
  components/
    ui/        generic, reusable primitives (Button, Input, Select, Textarea, Card, Badge, Alert...)
    layout/    Navbar, Footer
    home/      Hero, ServicesGrid, WhyChooseUsSection, CTASection
    forms/     EnquiryForm (public)
    admin/     DashboardHeader, EnquiryTable, EnquiryFilters, Pagination, ProtectedRoute
  context/     AuthContext (admin session, login/logout)
  lib/         api.ts (fetch client), auth.ts (token storage), validation.ts (zod),
               constants.ts (services, nav links), types.ts
```

## Setup

```bash
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_BASE_URL at your backend
npm install
npm run dev   # http://localhost:3000
```

## Notes on design decisions

- **Admin auth**: JWT is stored in `localStorage` (see `lib/auth.ts`) and attached via
  `Authorization: Bearer <token>` (see `lib/api.ts`). `ProtectedRoute` redirects unauthenticated
  visitors from any `/admin/dashboard/*` page to `/admin/login`. `/admin` itself redirects
  straight to the login screen.
- **Validation**: `lib/validation.ts` mirrors the backend's Zod schema so the enquiry form and
  the admin edit form give instant feedback, while the backend still re-validates independently.
- **Reusable UI**: every form field, button, card, badge, etc. is a shared component under
  `components/ui`, used consistently across the public site and the admin panel.

## Deployment (Vercel)

1. Push this `frontend/` folder as (or import as a subdirectory of) a GitHub repo into Vercel.
2. Set the environment variable `NEXT_PUBLIC_API_BASE_URL` to your deployed backend's `/api` URL.
3. Framework preset: Next.js (auto-detected). Build command: `next build`.
