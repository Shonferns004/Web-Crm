# 03 — Database Design

Database: PostgreSQL via Supabase, managed by Prisma. Shared schema, tenant isolation via `organization_id`.

## Table Groups

### System (platform-level)

| Table | Purpose |
|-------|---------|
| `Organization` | A tenant (NGO). Name, slug, status, plan, contact, logo, branding. |
| `OrganizationSetting` | Key/value settings per org (navbar, footer, socials, bank, payment, map…). |
| `User` | Platform user (admins, staff). Belongs to platform, can be linked to many orgs. |
| `Role` | Named role (e.g. `ORG_ADMIN`, `ORG_EDITOR`, `VIEWER`). |
| `Permission` | Granular permission (e.g. `project:create`). |
| `RolePermission` | Many-to-many role ↔ permission. |
| `OrganizationUser` | Join: user ↔ org with role + `is_active` + `is_current`. |
| `RefreshToken` | Rotating refresh tokens (hashed). |
| `AuditLog` | Immutable audit trail of mutations. |
| `Notification` | In-app notifications for users. |

### CMS (website content)

| Table | Purpose |
|-------|---------|
| `Page` | Website page (slug, meta, status, template). |
| `PageSection` | Ordered section instance on a page (type, sort, active, settings; `content` JSON stored inline). |
| `SectionTemplate` | Section-type definition with a `fields` array (platform built-ins + org-scoped customs). |
| `Menu` | Named menu (e.g. `main-nav`, `footer`). |
| `MenuItem` | Menu tree node (label, url/entity, parent, order, active). |
| `Banner` | Reusable banner block. |
| `Slider` + `SliderSlide` | Hero/reusable sliders with ordered slides (desktop+mobile image). |
| `Media` | Uploaded asset (URL, mime, size, bucket, thumbnails). |

### CRM / Entity (website + CRM records)

| Table | Purpose |
|-------|---------|
| `Department` | Org department. |
| `Employee` | Staff record (can link to a User). |
| `Donor` | Donor profile. |
| `Volunteer` | Volunteer record. |
| `Beneficiary` | Beneficiary / cause recipient record. |
| `Project` | Program/project. |
| `ProjectImage` | Images for a project. |
| `ProjectService` | Services offered by a project. |
| `ProjectImpact` | Impact/mission points of a project. |
| `ProjectStat` | Numeric stats of a project. |
| `Event` | Event record. |
| `Blog` + `BlogCategory` | Articles and categories. |
| `Gallery` + `GalleryItem` | Albums and their media items. |
| `Campaign` | Appeal / fundraising campaign. |
| `Donation` | Client-captured donation record. |
| `Account` | Financial account (bank/type). |
| `Transaction` | Ledger transaction. |
| `Receipt` | Donation receipt metadata. |
| `Document` + `DocumentCategory` | Legal/reports documents (PDFs). |
| `Testimonial` | Quote/testimonial. |
| `Partner` | Partner with logo. |
| `FAQ` | Question/answer. |
| `Award` | Award/certification. |
| `Location` | Office/branch address. |

## Key Columns / Conventions

- Primary key: `id UUID` (uuid v4 generated in Prisma).
- `created_at`, `updated_at` on every table.
- Tenant tables carry `organization_id UUID` (indexed, FK → Organization).
- Soft deletes are NOT used by default; deletions are hard but always audit-logged.
- `status`/`is_active` booleans control visibility on the public site.

## Section Types (content shape lives in `src/sections/`)

`hero`, `hero-slider`, `page-hero`, `banner-strip`, `about`, `story`, `stats`, `cards`, `values`, `sectors`, `projects-grid`, `program-detail`, `mission-vision`, `cta`, `team`, `testimonials`, `stories`, `gallery`, `partners`, `documents`, `campaigns`, `donate`, `contact-info`, `map`, `form`, `legal`, `awards`, `newsletter`, `faq`, `location`.

Each type defines a Zod schema used to validate `PageSection.content`. Built-ins are seeded as `SectionTemplate` rows (`isSystem: true`, platform scope, `organizationId: null`); their `fields` array mirrors the static schemas in `src/sections/`. Org-scoped custom templates define their own `fields` and are validated with a runtime-generated schema (`src/utils/sectionFields.ts`).

## Seed Content

`prisma/seed.ts` creates:
- Platform master admin (`master@webcrm.com`, `isMaster: true`).
- Three system roles: `master`, `admins` (platform), `website_user` (organization) with the full permission set; a sample platform admin (`admin@webcrm.com`) assigned to all seeded websites via `OrganizationAssignment`.
- The three organizations (Being Sevak, Ashray, MANN Care) with their settings harvested from the existing websites (address, phones, emails, socials, bank/IFSC, Razorpay keys, WhatsApp, map URL, logos) and a website user per site (`website_user` membership).
- 30 built-in `SectionTemplate` rows (platform, `isSystem: true`).
- A default site template: pages + ordered sections mirroring the unified section catalog, so the admin panel has real structure to edit immediately.

> Seeding requires real Supabase credentials; with `.env.example` placeholders, `prisma db push` / migrations cannot reach a database. The schema is the source of truth and is migrated once credentials exist.
