# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/portfolio site for a landscape designer (Ландшафтный дизайнер Марина Шестакова) with a password-protected admin panel for editing site content. The public UI is entirely in Russian — keep user-facing strings in Russian to match.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint (eslint)
```

- `postinstall` runs `prisma generate` automatically.
- No test suite exists in this repo.
- After changing `prisma/schema.prisma`, run `npx prisma generate` (and `npx prisma db push` / `migrate` against `DATABASE_URL`).

## Architecture

Next.js 14 **App Router** + React 18, TypeScript (strict), Tailwind. Data lives in **PostgreSQL (Neon)** accessed via **Prisma**; images live in **AWS S3**. Import alias `@/*` maps to `src/*`.

### Data model (prisma/schema.prisma)
Four models, each used in a deliberately un-normalized way — understand these conventions before touching content:
- **Settings** — key/value store. Each editable field of the homepage (`main_header`, `description`, `whatsapp`, `phone1`, etc.) is its **own row** keyed by the unique `field` column. Reads use `findMany({ where: { field: { in: [...] } } })` then `.find(el => el.field === ...)`; writes use one `upsert` per field. See `src/app/page.tsx` and `src/actions/settings/edit/editSettings.ts`.
- **Project** — the entire portfolio gallery is stored in a **single row with `id: 1`**. `fileNamesArr` is a JSON-stringified array of S3 filenames, `JSON.parse`d on read and upserted whole on save. See `src/components/visitor-side/portfolio/portfolio.tsx` and `src/actions/projects/edit/index.ts`.
- **Service** — normal one-row-per-item table, sorted by `order` asc then `createdAt` desc.
- **User** — admin credentials; `password` is a bcrypt hash.

### Auth (NextAuth v5 beta, credentials)
- `src/auth.config.ts` — shared config; the `authorized` callback gates any path under `/admin`.
- `src/auth.ts` — Credentials provider; validates email/password with zod, looks up the user, `bcrypt.compare`s the password.
- `src/middleware.ts` — applies the auth config as middleware (matcher excludes `api`, `_next`, `.png`). Unauthenticated `/admin/*` requests redirect to `/login`.

### Server actions pattern
Mutations are Next.js **server actions** in `src/actions/**`, consumed by client forms via React's `useActionState` (see `src/components/admin/**`). Every action follows the same shape:
1. `"use server"` at top.
2. Signature `(formState, formData) => Promise<FormState>` where `FormState` carries `errors` (per-field arrays plus `_form`) and sometimes `success`.
3. Pull values with `formData.get(...)`, validate with a zod schema from `src/zod/**` (`safeParse`), return `result.error.flatten().fieldErrors` on failure.
4. Do the Prisma write inside try/catch, returning the error under `errors._form`.
5. On success: `revalidatePath("/")` + `revalidatePath("/admin/...")`, then `redirect(...)` (note: `redirect` throws, so it must be after the try/catch, not inside it).

Match this shape when adding actions. zod schemas live in `src/zod/{settings,service,user}`.

### Image uploads (S3)
- Upload endpoint: `POST src/app/api/s3-upload/route.ts`. Accepts multipart form with `file` and `directory`; renames the file to a `uuid.ext`, uploads to `s3://<bucket>/<directory>/<uuid.ext>`, and returns `{ fileName }`. Only the generated filename is stored in the DB — never a full URL.
- Convention: images are grouped into S3 "directories" by content type, e.g. `services/`, `projects/`.
- Display URLs are rebuilt client-side from env vars:
  `${NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/<directory>/<fileName>`.
  `next.config.mjs` whitelists this host under `images.remotePatterns`, so `next/image` requires those env vars set at build time.
- Client-side upload/reorder UI uses `react-dropzone` and `@dnd-kit` (drag-to-sort in `src/components/admin/**/dropzone`).

### Layout / rendering
- `src/db/index.ts` — singleton Prisma client (`globalThis.prisma`) to survive HMR in dev.
- Public homepage `src/app/page.tsx` is a server component that fetches Settings + Services and composes section components from `src/components/visitor-side/**`. Client interactivity (`framer-motion`, `embla-carousel`) is isolated in `"use client"` leaf components.

## Environment

`.env` (untracked) must define: `DATABASE_URL`, `AUTH_SECRET`, `NEXT_AWS_S3_REGION`, `NEXT_AWS_S3_ACCESS_KEY_ID`, `NEXT_AWS_S3_SECRET_ACCESS_KEY`, `NEXT_AWS_S3_BUCKET_NAME`, `NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL`, `NEXT_PUBLIC_AWS_S3_BUCKET_LINK`.

## Repo gotchas

- This working copy lives in a Yandex.Disk-synced folder, which spawns duplicate files like `index (2).ts` / `page (2).tsx`. These are sync artifacts, not real modules — don't edit or import them; the canonical file is the one without ` (2)`.
- `src/components/admin/services/dropzone/dropzoneInput.jsx` builds its preview URL against the `articles/` S3 directory while services are actually uploaded under `services/` — likely a copy-paste bug if you touch that component.
