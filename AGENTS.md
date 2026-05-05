# AGENTS.md

## Monorepo

Two independent npm packages — run commands from the respective subdirectory, **never** from root:

- `web/` — Next.js frontend
- `api/` — NestJS backend

No root-level `package.json` or workspace config.

## Frontend (web/)

### Stack
Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS **4**, shadcn/ui, Redux Toolkit, React Hook Form + Zod, i18next (custom, not next-intl), Axios.

### Build & dev

```
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint     # ESLint 9
```

### Static export (critical)

The project uses `output: 'export'` in `next.config.ts`. Consequences:

- **No SSR, API routes, middleware, or `cookies()`/`headers()` at runtime.**
- All pages must be prerenderable or use `"use client"`.
- `trailingSlash: true` is enforced — all links must use `/` suffixes.
- `images.unoptimized: true` — no `next/image` optimization at build time.
- Do not add server-only APIs, route handlers, or Edge functions.

### Architecture (Feature-Sliced Design)

Strict import direction: **app → widgets → features → entities → shared**

- `src/app/` — route layouts and pages only
- `src/widgets/` — UI compositions: Header, Footer, LangRedirect
- `src/features/` — self-contained features: auth, contact, language-switcher
- `src/entities/` — domain slices: user
- `src/shared/` — reusable: UI kit, API client, store, config, lib

Each feature follows `api/`, `model/`, `ui/`, `index.ts`.

**No relative imports from shared into features/widgets.** Use `@/` alias (maps to `src/`).

### shadcn/ui

- Components live at `@/shared/ui/`, **not** `@/components/ui/`.
- Config in `components.json` uses `radix-nova` style, Tailwind CSS `neutral` base, RSC enabled.
- The `cn()` helper is at `@/shared/lib/utils`.

### i18n

Custom solution (not next-intl). Route-based: `src/app/(public)/[lang]/...`.

- Supported: `lt` (default), `en`, `ru`.
- Dictionaries in `src/shared/config/i18n/dictionaries/{lt,en,ru}/`.
- Language preference stored in `localStorage` via `LANGUAGE_STORAGE_KEY`.
- `LangRedirect` widget handles initial redirect to stored/default language.

### Environment

`NEXT_PUBLIC_BASE_URL` must end with `/v1` (e.g. `http://localhost:3003/v1`). Used by the Axios instance in `src/shared/api/axios.ts`.

### Redux

Minimal setup. Only a `user` slice (idle/loading/succeeded/failed). Store at `src/shared/store/store.ts`.

### No tests configured

No Jest/Vitest/Playwright setup exists for the frontend.

## Backend (api/)

### Stack
NestJS 11, TypeORM 0.3, MySQL 8, JWT, Swagger, Handlebars mailer, class-validator + Joi, TypeScript 5.

### First-time setup

1. Copy `.env.example` → `.env`, fill in secrets.
2. Start MySQL with Docker: `docker-compose up -d`
3. Install deps: `npm install`
4. Run migrations: `npm run migration:run`
5. `npm run start:dev` → http://localhost:3003
6. API prefix: `/v1` (global prefix set in `main.ts`)
7. Swagger docs: http://localhost:3003/docs (only when `SWAGGER_ENABLED=true`)

### Commands

```
npm run start:dev          # development with hot reload
npm run build              # TypeScript compilation to dist/
npm run start              # production (needs pre-built dist/)
npm run lint               # ESLint 9 + typescript-eslint type-checked
npm run format             # Prettier (singleQuote, trailingComma all)
npm run test               # Jest (but no spec files exist yet)
npm run migration:generate -- name=MigrationName
npm run migration:run
npm run migration:revert
```

### Docker

`docker-compose.yml` only runs MySQL 8. The NestJS app runs on the host (port 3003). Environment for MySQL comes from `.env`.

### Architecture

Standard NestJS modules under `src/modules/`:

- `auth/` — register, login, verify-email, refresh. JWT guard.
- `users/` — user CRUD.
- `common/` — shared: mail, security (scrypt passwords), API filters.

Controller-Service-Repository pattern. Cross-module communication via interfaces/events only — no direct DB access across modules.

### Auth flow

JWT access + refresh tokens. Passwords hashed with scrypt (N=16384, r=8, p=1). Email verification required — sends multi-lang HTML email via Handlebars template.

### Config & validation

- `src/config/configuration.ts` — loads all env vars.
- `src/config/env.validation.ts` — Joi schema, validates on bootstrap.
- Database sync is **off** (`DB_SYNC=false`) — use migrations only.

### Testing

Jest is configured (ts-jest, rootDir `src`, testRegex `.*\.spec.ts$`) but **no test files exist**. Adding `npm run test` will pass with 0 tests.

### Formatting

Prettier config: `singleQuote: true`, `trailingComma: 'all'`. The web package has no Prettier config — API only.
