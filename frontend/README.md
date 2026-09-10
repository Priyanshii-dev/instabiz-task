# InstaBizWeb — Frontend (Next.js 14 + TypeScript + Tailwind CSS)

This frontend contains the public marketing site for InstaBizWeb plus a separate `/admin` area for
admin login, dashboard access, and enquiry management.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Shared Zod validation on the client
- Centralized API client for backend communication

## Folder structure

```text
src/
  app/
    (site)/
      about/
      contact/
      services/
      why-choose-us/
      layout.tsx
      page.tsx
    admin/
      layout.tsx
      page.tsx
      dashboard/
        page.tsx
        [id]/
          page.tsx
      login/
        page.tsx
  components/
    admin/
      DashboardHeader.tsx
      EnquiryFilters.tsx
      EnquiryTable.tsx
      Pagination.tsx
      ProtectedRoute.tsx
    forms/
      EnquiryForm.tsx
    home/
      CTASection.tsx
      Hero.tsx
      ServicesGrid.tsx
      WhyChooseUsSection.tsx
    layout/
      Footer.tsx
      Navbar.tsx
    ui/
      Alert.tsx
      Badge.tsx
      Button.tsx
      Card.tsx
      Container.tsx
      Input.tsx
      Select.tsx
      SectionHeading.tsx
      Spinner.tsx
      Textarea.tsx
      Toast.tsx
  context/
    AuthContext.tsx
  lib/
    api.ts
    auth.ts
    constants.ts
    types.ts
    validation.ts
```

## Environment variables

The app expects a `NEXT_PUBLIC_API_BASE_URL` value that points to the backend API base URL.

```bash
cp .env.local.example .env.local
```

Example:

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Setup

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:3000` by default.

## Key implementation notes

- Admin auth is handled through `src/context/AuthContext.tsx`, with tokens stored in `localStorage`
  and retrieved via `src/lib/auth.ts`.
- All backend requests go through `src/lib/api.ts`, which automatically adds the bearer token when
  required.
- `ProtectedRoute.tsx` guards the `/admin/dashboard` pages and redirects unauthenticated users to
  `/admin/login`.
- A shared validation layer in `src/lib/validation.ts` mirrors the backend’s Zod schemas for faster
  client-side feedback.

## Deployment (Vercel)

1. Import the `frontend/` app into Vercel (or deploy it as a subdirectory of a GitHub repo).
2. Set `NEXT_PUBLIC_API_BASE_URL` to the deployed backend’s `/api` URL.
3. Use the default Next.js preset and run `next build`.

## Notes

- The workspace already contains a local `.env.local` file, so you can update it directly for the
  current deployment target.
- The public site includes the Home, About, Services, Why Choose Us, and Contact pages.
- The admin area supports login, dashboard listing, filtering, pagination, enquiry detail views,
  editing, and deletion.
