# 07 — Modules

Every module ships `routes.ts`, `controller.ts`, `service.ts`, `repository.ts`, `schema.ts` in `src/modules/<name>/`.

## Auth
- `POST /auth/login` — verify credentials (Argon2), issue access + refresh tokens, return user + org memberships.
- `POST /auth/refresh` — rotate refresh token (hash compare, invalidate old, detect reuse).
- `POST /auth/logout` — invalidate refresh token.
- `POST /auth/change-password` — verify current password, hash new, revoke refresh family.
- `GET /auth/me` — current user, roles, memberships.

## Organization
- CRUD for tenants: **create by master or platform admins** (admins are auto-assigned to sites they build); delete is **master only**.
- `POST /organizations` takes a website `name` + `url`; slug is auto-derived from the name.
- Creating a website **auto-generates a website-user credential** (`site@<slug>.webcrm.local` + random password, or `adminEmail` override). The plaintext password is returned **once** in the `webUser` object of the create response; only the hash is stored.
- `organization:delete` guarded: refuses when tenant data exists.
- Settings: read all as flat object; bulk update by key list.
- Website user management: `GET/POST /organizations/:id/users`, `DELETE /organizations/:id/users/:userId` (master or assigned admin).
- Admin assignment: `GET/POST/DELETE /organizations/:id/admins(/:userId)` — master assigns/unassigns platform admins to a website (`OrganizationAssignment`).

## User
- CRUD for platform users (master); `role: "admins"` on create promotes a platform admin (master only).
- Assign user to org with a role (`OrganizationUser`).
- List memberships; set active org.

## Dashboard
- `GET /dashboard/overview` — platform totals (master: all sites; admin: assigned sites only).
- `GET /dashboard/websites` — site list with counts (scoped).
- `GET /dashboard/websites/:id` — single-site stats (master or assigned admin).
- `GET /dashboard/my-website` — current site stats for a website user (`X-Organization-Id`).

## Role / Permission
- Read permission catalog (seeded).
- Create/update/delete roles and their permission set.
- Built-in roles are protected from deletion.

## Audit
- Middleware/service writes `AuditLog` on mutations (actor, action, resource, resourceId, org, before/after JSON).
- Read endpoints filtered by org / actor / action / date range.

## Notification
- Create notifications for users (system, donations, assignments).
- List mine (unread first), mark one/all read.

## Media
- Upload to Supabase Storage bucket `media/<orgSlug>`.
- Create `Media` row (original + thumbnail url).
- List/filter by type (image/pdf/…), delete (row + storage object).

## Donation
- Client-captured flow: admin/website client supplies `paymentProvider`, `paymentId`, optional `orderId`, `signature`, amount, donor info.
- Optional Razorpay signature verification using org's `payment.razorpayKeySecret`.
- Creates `Donation` (+ linked `Donor` when identified).

## Settings
- `OrganizationSetting` key/value store with default set per org.
- Site settings consumed by the `site` endpoint.

## CMS

### Page
- CRUD pages (slug, meta, status, template, sort).
- Slug uniqueness within org.

### Section
- Add/update/delete `PageSection` on a page.
- Content JSON validated per section type; reorder via `sortOrder`; toggle `isActive`.
- **Section templates** (`SectionTemplate`): data-driven field definitions.
  - 30 platform built-ins (`isSystem`, locked) mirroring `src/sections/schemas.ts`.
  - Org-scoped custom templates created by master or website users (`section:create/update`); delete requires `section:delete` and is blocked while in use.
  - Endpoints: `GET/POST /sections/templates`, `PATCH/DELETE /sections/templates/:id`.
  - Validation: built-ins use the static Zod schemas in `src/sections/`; custom templates use a schema generated at runtime from `fields` via `src/utils/sectionFields.ts` (`zodFromFields`).
  - `GET /pages/:id` embeds `template.fields` per section so a UI renders a dynamic form; adding a custom section auto-prefills field defaults.

### Menu
- CRUD menus + nested items (parent_id, label, url/entity, order, active).

### Banner / Slider
- CRUD banners; CRUD sliders + ordered slides (desktop/mobile image, alt, CTA).

### Site
- `GET /site/:organizationSlug` — assembles the full site tree (settings + menus + pages → sections → content + resolved entities). Used by admin preview and future website templates.

## Entities
Shared CRUD pattern with org scoping for: Project (+ images/services/impact/stats), TeamMember, Event, Blog (+ category), Gallery (+ items), Document (+ category), Testimonial, Partner, FAQ, Campaign, Donor, Volunteer, Beneficiary, Employee, Department, Account, Transaction.
