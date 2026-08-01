# 05 — Security

## Authentication

- **Passwords**: Argon2id hashing (via `argon2`). Never stored or logged in plain text.
- **Access token**: short-lived JWT (default 15m). Claims: `sub` (user id), `orgs` (membership org ids), `roles`, `permissions`.
- **Refresh token**: long-lived (default 30d), stored **hashed** in `RefreshToken` table, rotated on every refresh (old token invalidated). Reuse detection revokes the whole family.
- **Logout** invalidates the presented refresh token.

## Authorization (RBAC)

- `Role` ↔ `Permission` many-to-many.
- Middleware chain per route: `auth` (verifies JWT) → `rbac(permission)` (checks permission) → `orgScope` (resolves + locks organization).
- Permission codes follow `resource:action` (e.g. `project:create`, `page:update`, `organization:delete`).
- The **master** role bypasses RBAC checks (full platform access).
- **Platform admins** (`admins`) create websites and manage the ones they created/are assigned (`OrganizationAssignment`); they cannot delete websites.
- **Website users** (`website_user`) carry only website-customization permissions (CMS, media, settings, read-only entities) — no CRM/finance writes.

## Tenancy Isolation

- Every tenant query filters by the active organization resolved from JWT + `X-Organization-Id` + membership row — never from unvalidated client input.
- Attempts to access another org's rows return `403` (not `404`) to avoid existence leakage, then are audit-logged.

## Input Validation

- Every request body/param/query validated by a Zod schema (`validate` middleware).
- Section content JSON validated before storage — built-in section types by their static Zod schema in `src/sections/`, custom types by a schema generated at runtime from the template's `fields` (`src/utils/sectionFields.ts`), then re-stored as the parsed value (unknown keys rejected).
- Template `fields` definitions themselves are validated by a recursive Zod schema, so invalid field definitions cannot be persisted.
- Unknown fields are stripped by default.

## Rate Limiting

- Global limiter per IP; stricter limiters on auth endpoints (login/refresh) to mitigate brute force.

## Other

| Control | Implementation |
|---------|----------------|
| Security headers | `helmet` |
| CORS | Allow-list from config, enforced per origin |
| Logging | Request logging; sensitive fields (password, token, payment id) redacted |
| Audit | Every create/update/delete writes an `AuditLog` row (actor, action, org, target, before/after) |
| Secrets | Env-driven via `.env`; `.env.example` ships placeholders only |
| Payment keys | Stored per-org as `OrganizationSetting`; never returned fully on public endpoints |
