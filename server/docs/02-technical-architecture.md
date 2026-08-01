# 02 — Technical Architecture

## Stack

| Concern | Choice |
|---------|--------|
| Runtime | Node.js 20+ (LTS) |
| Language | TypeScript (strict) |
| HTTP framework | Express 4 |
| ORM | Prisma 6 |
| Database | Supabase PostgreSQL |
| Storage | Supabase Storage (media) |
| Auth | JWT (access + refresh rotation), Argon2 password hashing |
| Validation | Zod (request bodies, params, query, section content) |
| Linting / formatting | ESLint + Prettier |

## Layered Pattern

Every module follows **Repository → Service → Controller**:

```
Routes → Controller → Service → Repository → Prisma
            ↓             ↑
          validation  (Zod)  ← applied in routes/controller
```

- **Repository**: raw Prisma queries. Owns database access.
- **Service**: business logic, tenancy enforcement, cross-module calls.
- **Controller**: HTTP concerns only — parse request, call service, format response.
- **Routes**: wire controller methods, apply middlewares and zod validation.

This keeps HTTP, business rules, and data access decoupled and testable.

## Multi-Tenancy Strategy

- **Shared schema** with `organization_id` column on every tenant table (no per-tenant databases).
- The authenticated user's org membership is encoded in the **JWT claims** and further enforced by the `X-Organization-Id` header on every request.
- An `orgScope` middleware resolves the effective organization:

1. Read `X-Organization-Id` header.
2. Verify membership exists between the requesting user and that organization.
3. Attach the active `Organization` to `req.activeOrg`.
4. All repository queries **must** filter by `activeOrg.id` — never from unvalidated input.

This supports 1000+ organizations without code changes; adding an org is a data row, not a migration.

## Folder Structure

```
server/
├── docs/                       # this documentation set
├── prisma/                     # schema.prisma, seed.ts, migrations
├── src/
│   ├── index.ts                # bootstrap
│   ├── app.ts                  # express app + routes
│   ├── config/                 # env validation + config object
│   ├── libs/                   # prisma, supabase clients
│   ├── types/                  # express request augmentation
│   ├── utils/                  # asyncHandler, ApiError, jwt, password, sectionFields (dynamic FieldDef → Zod)
│   ├── middlewares/            # auth, rbac, orgScope, validate, errors, etc.
│   ├── sections/               # built-in section type zod schemas + registry
│   ├── modules/                # feature modules (5-file pattern)
│   └── routes/                 # route aggregation under /api
```

## Module File Pattern

```
modules/<name>/
├── routes.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts          # zod validation for this module
```

## Config

Environment variables are validated at boot by a Zod schema in `src/config/index.ts`. Missing/invalid config fails fast with a clear message. See `.env.example` for the full list.

## API Conventions

- Base path: `/api/v1`
- JSON envelope: `{ success, message, data, errors? }`
- Errors carry structured `{ code, message, field?, details? }`
- List endpoints support `page`, `limit`, `search`, `sortBy`, `sortOrder`, and common filters.
- All tenant routes require `Authorization: Bearer <accessToken>` and `X-Organization-Id`.

## Verification Commands

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # tsc build to dist/
```
