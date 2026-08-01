# 12 — Roadmap

## Status Legend
- ✅ Done — this pass
- 🔜 Next
- 🕓 Planned

## Phase 1 — Foundation (✅ this pass)
- ✅ Project scaffold (TypeScript strict, ESLint, Prettier)
- ✅ Prisma schema for all system, CMS, and CRM/entity tables
- ✅ Seed: platform master, 3 roles (`master`/`admins`/`website_user`), permissions, 3 organizations with settings, sample platform admin + assignments, default site template
- ✅ Auth (login / refresh rotation / logout / change-password / me)
- ✅ Organization CRUD + settings (create by master or admins, delete master only)
- ✅ Auto website-user credential on site creation (returned once as `webUser { email, password }`)
- ✅ Dashboard (overview / websites / my-website) scoped by role
- ✅ Website-user management per site + platform-admin assignment to websites
- ✅ User CRUD + org assignment + platform-admin creation
- ✅ Role / permission RBAC
- ✅ Audit log
- ✅ Notifications
- ✅ Media upload (Supabase Storage)
- ✅ Donation record (client-captured)
- ✅ Section builder core (Pages, PageSection, per-type Zod schemas)
- ✅ Data-driven section templates (`SectionTemplate`): 30 platform built-ins + org-scoped custom types with dynamic field definitions (`GET/POST /sections/templates`)
- ✅ Menus, banners, sliders
- ✅ Entity CRUD (projects, team, events, blogs, gallery, documents, testimonials, partners, FAQs, campaigns, donors, volunteers, beneficiaries, employees, departments, accounts, transactions)
- ✅ Site config endpoint (`GET /api/v1/site/:slug`)

## Phase 2 — Admin & Website (🔜 next)
- 🕓 `admin/` panel: site stats, website-user management for assigned sites, section editor (edit every heading/description/image), media manager, settings forms
- 🕓 `master/` panel: website creation, platform-admin assignment, user provisioning
- 🕓 Website templates for Being Sevak, Ashray, MANN Care rendering the section JSON tree
- 🕓 Live preview of section edits
- 🕓 Publication workflow (draft / published status per page & section)

## Phase 3 — Payments & Finance (🕓 planned)
- 🕓 Server-side order creation (`POST /orders`), Razorpay webhook verification
- 🕓 Receipt generation (PDF) via `Receipt` records
- 🕓 Refund handling, reconciliation reports
- 🕓 Accounts/transactions auto-posting from verified donations

## Phase 4 — Advanced (🕓 planned)
- 🕓 Multi-language content blocks per section
- 🕓 A/B hero variants
- 🕓 Analytics: per-org page/section view tracking
- 🕓 Email notifications (SMTP) replacing in-app-only notifications
- 🕓 Export/import (CSV/JSON) for CRM entities
- 🕓 Audit log retention + archival
- 🕓 Soft-delete + trash for CMS content
- 🕓 Rate/plan tiering per org, usage metering

## Backlog Notes
- Add Supabase real credentials + run migrations + seed against the live DB.
- Wire the three existing website codebases to `GET /api/v1/site/:slug` so content flows from the admin panel.
- Decide `media` vs `public-media` bucket strategy per deployment.
