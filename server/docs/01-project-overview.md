# 01 — Project Overview

## Product Vision

WebCrm is a **commercial, multi-tenant Web + CRM platform** that lets a single platform administrator create and manage multiple non-profit organizations (NGOs). Each organization gets:

- A public **website** whose every heading, description, and image is editable section-by-section from an admin panel (CMS).
- A **CRM** for managing donors, volunteers, beneficiaries, employees, projects, events, blogs, gallery, documents, accounts, and more.

The platform is designed to serve **unlimited organizations** (currently Being Sevak, Ashray, and MANN Care) without any code changes when a new organization is onboarded.

## Multi-Tenant Model (3 logins)

```
Master (platform super admin — isMaster)
  └── creates Platform Admin accounts (admins)
        └── admin creates a Website (organization) with name + URL
              ├── backend auto-creates a Website User credential
              │     (email + generated password) and returns it once
              ├── the admin shows the credential to the site owner
              └── Website User logs in with it → edits/adds sections
```

- **Login 1 — Master**: creates platform admins. Full platform access.
- **Login 2 — Platform Admin** (`admins`): creates websites (name + URL) and manages the ones they create/are assigned — site stats, creating/assigning more website users. Cannot delete websites.
- **Login 3 — Website User** (`website_user`): auto-generated when a website is created; logs in with the credential shown to the admin and customizes the website (sections, pages, menus, media, banners, sliders, settings). No CRM/finance access.
- Admin–website ownership is stored in the `OrganizationAssignment` join table (auto-created when an admin builds a site); per-site membership is `OrganizationUser` (role `website_user`).
- Each tenant's data is **isolated** by `organization_id` on every tenant table.

## Current Organizations

| Slug | Name | Website root |
|------|------|--------------|
| `being-sevak` | Being Sevak Foundation | beingSevak2.0 |
| `ashray` | Ashray Foundation | AashrayFoundation |
| `mann-care` | MANN Care Foundation | MannCareFoundationV2.0 |

## Module Map

### System
- Authentication & sessions (JWT access + refresh rotation)
- User & admin management
- Role-based access control (RBAC) with granular permissions
- Organization & organization settings
- Audit log
- Notifications

### Website / CMS
- Pages & ordered sections (section builder)
- Section content (JSON blocks, per-type schema)
- Menus, banners, sliders
- Media manager (Supabase Storage)
- Global site settings (navbar, footer, contact, socials, bank, payment keys)

### CRM / Entities
- Projects (with services, impact, stats, images)
- Team members, departments, employees
- Events, blogs (+ categories), gallery (+ items)
- Donors, volunteers, beneficiaries
- Campaigns / appeals
- Documents (+ categories), testimonials, partners, FAQs, awards, locations
- Accounts, transactions, receipts
- Donations

## Website Templates on the CMS API

The three existing websites (Being Sevak, Ashray, MANN Care) currently hardcode all content in JSX. Under WebCrm they are re-imagined as **templates that render the section JSON tree** served by the CMS API. The backend provides a single site-config endpoint per organization; websites are wired in a later phase.

## Scope of This Repository

- `server/` — the backend (Express + TypeScript + Prisma + Supabase), built here.
- `master/`, `admin/` — future frontends (platform + website panels), separate workstreams.
