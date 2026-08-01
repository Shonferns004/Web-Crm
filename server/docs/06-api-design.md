# 06 — API Design

Base path: `/api/v1`

## Conventions

- RESTful resource endpoints under `/api/v1/<resource>`.
- Tenant resources require headers:
  - `Authorization: Bearer <accessToken>`
  - `X-Organization-Id: <organizationUuid>`
- Responses use a JSON envelope:

```json
{
  "success": true,
  "message": "OK",
  "data": {},
  "errors": null
}
```

Errors:

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": [
    { "code": "INVALID_FIELD", "message": "name is required", "field": "name", "details": {} }
  ]
}
```

- HTTP status codes: 200 (OK), 201 (Created), 400 (bad input), 401 (unauthenticated), 403 (forbidden / cross-tenant), 404 (not found), 409 (conflict), 422 (validation), 429 (rate limited), 500 (server).

## Pagination

List endpoints accept `page` (default 1), `limit` (default 20, max 100), `search`, `sortBy`, `sortOrder` (`asc`/`desc`). Response data includes:

```json
{ "items": [], "page": 1, "limit": 20, "total": 42, "totalPages": 3 }
```

## Endpoint Overview (Phase 1 + CMS)

### Auth
| Method | Path | Permission | Description |
|--------|------|-----------|-------------|
| POST | `/api/v1/auth/login` | public | Sign in, returns access + refresh tokens and orgs |
| POST | `/api/v1/auth/refresh` | public | Rotate refresh token |
| POST | `/api/v1/auth/logout` | auth | Invalidate refresh token |
| POST | `/api/v1/auth/change-password` | auth | Change own password |
| GET | `/api/v1/auth/me` | auth | Current user + memberships |

### Organizations (master + admins)
| Method | Path | Permission | Description |
|--------|------|-----------|-------------|
| GET | `/api/v1/organizations` | `organization:view` | List orgs (master: all; admin: own/assigned only) |
| POST | `/api/v1/organizations` | `organization:create` | Create website (name + URL). Backend auto-creates a website-user credential and returns it once as `webUser { email, password }`; a creating admin is auto-assigned to the site |
| GET/PATCH | `/api/v1/organizations/:id` | `organization:view/update` | Read / update (guarded) |
| DELETE | `/api/v1/organizations/:id` | `organization:delete` | Delete website (master only) |
| GET/PUT | `/api/v1/organizations/:id/settings` | `organization:settings` | Read / bulk-update settings |
| GET | `/api/v1/organizations/:id/users` | `user:view` | List website users of the site |
| POST | `/api/v1/organizations/:id/users` | `user:create` | Create another website user (role `website_user`) |
| DELETE | `/api/v1/organizations/:id/users/:userId` | `user:delete` | Remove website user from the site |
| GET | `/api/v1/organizations/:id/admins` | `organization:assign` | List admins assigned to the site |
| POST | `/api/v1/organizations/:id/admins` | `organization:assign` | Assign a platform admin (master only) |
| DELETE | `/api/v1/organizations/:id/admins/:userId` | `organization:assign` | Unassign a platform admin (master only) |

### Users & RBAC (master)
| Method | Path | Permission | Description |
|--------|------|-----------|-------------|
| GET/POST | `/api/v1/users` | `user:view/create` | List / create users (`role: "admins"` creates a platform admin, master only) |
| GET/PATCH/DELETE | `/api/v1/users/:id` | `user:view/update/delete` | Read / update / delete |
| POST | `/api/v1/users/:id/assign-org` | `user:assign` | Assign org + role |
| DELETE | `/api/v1/users/:id/orgs/:orgId` | `user:assign` | Remove from org |
| GET/POST | `/api/v1/roles`, `/api/v1/permissions` | `role:view/create` | Roles & permissions |

### Dashboard
| Method | Path | Permission | Description |
|--------|------|-----------|-------------|
| GET | `/api/v1/dashboard/overview` | `dashboard:view` | Platform totals (master: all; admin: assigned sites) |
| GET | `/api/v1/dashboard/websites` | `dashboard:view` | Website list with stats (scoped) |
| GET | `/api/v1/dashboard/websites/:id` | `dashboard:view` | Single-site stats (master or assigned admin) |
| GET | `/api/v1/dashboard/my-website` | `dashboard:view` | Current site stats for a website user (`X-Organization-Id`) |

### Misc
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/audit-logs` | Audit trail (filter by org/actor/action) |
| GET | `/api/v1/notifications` | My notifications (mark-read endpoint too) |
| POST | `/api/v1/media/upload` | Upload file → Supabase Storage + Media row |
| GET/DELETE | `/api/v1/media` | List / delete media |
| POST | `/api/v1/donations` | Record client-captured donation |
| GET | `/api/v1/donations` | List donations (org) |

### CMS
| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/api/v1/pages` | List / create pages |
| GET/PATCH/DELETE | `/api/v1/pages/:id` | Read / update / delete page |
| POST | `/api/v1/pages/:id/sections` | Add section (type + content) |
| PATCH | `/api/v1/pages/:id/sections/:sectionId` | Update section (reorder / toggle / content) |
| DELETE | `/api/v1/pages/:id/sections/:sectionId` | Remove section |
| GET | `/api/v1/sections/templates` | List section templates (platform built-ins + org customs) |
| POST | `/api/v1/sections/templates` | Create org-scoped custom section template (defines fields) |
| PATCH/DELETE | `/api/v1/sections/templates/:id` | Update / delete custom template (delete blocked while in use) |
| GET/POST/PATCH/DELETE | `/api/v1/menus`, `/api/v1/banners`, `/api/v1/sliders` | Menus, banners, sliders |

> **Section templates** make the CMS data-driven: each template carries a `fields` array (name, label, type: `text/textarea/richText/url/number/boolean/select/image/gallery/link/entityRef/group/list/repeater/date`, plus `required`/`maxLength`/`options`/`minItems`/`maxItems`). `GET /pages/:id` embeds each section's `template.fields` so a UI can render a dynamic form. The 30 platform built-ins mirror `src/sections/schemas.ts` and are locked (`isSystem`); custom templates are org-scoped and validated with a runtime-generated Zod schema.

Example custom template (`POST /api/v1/sections/templates`):
```json
{
  "type": "impact-boxes",
  "name": "Impact Boxes",
  "label": "Impact Boxes",
  "fields": [
    { "name": "heading", "label": "Heading", "type": "text", "required": true, "maxLength": 300 },
    {
      "name": "items", "label": "Items", "type": "repeater", "minItems": 1, "maxItems": 10,
      "fields": [
        { "name": "title", "label": "Title", "type": "text", "required": true },
        { "name": "count", "label": "Count", "type": "text" }
      ]
    }
  ]
}
```

### Site Config (public-ish, consumed by websites)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/site/:organizationSlug` | Full page→section JSON tree + global settings + menus |

### Entities (all follow CRUD)
`/api/v1/projects`, `/api/v1/team-members`, `/api/v1/events`, `/api/v1/blogs`, `/api/v1/galleries`, `/api/v1/documents`, `/api/v1/testimonials`, `/api/v1/partners`, `/api/v1/faqs`, `/api/v1/campaigns`, `/api/v1/donors`, `/api/v1/volunteers`, `/api/v1/beneficiaries`, `/api/v1/employees`, `/api/v1/departments`, `/api/v1/accounts`, `/api/v1/transactions`.

## Site Endpoint Payload Shape

```json
{
  "organization": { "id", "name", "slug", "logo" },
  "settings": { "siteName", "tagline", "contact", "socials", "bank", "payment", "footer" },
  "menus": [ { "id", "name", "items": [ { "label", "url", "children" } ] } ],
  "pages": [
    {
      "id", "slug", "meta",
      "sections": [
        {
          "id", "type", "sortOrder", "isActive",
          "settings": {},
          "content": { "heading", "description", "images", "items": [] },
          "entities": [ { "type": "project", "id", "slug", "title", ... } ]
        }
      ]
    }
  ]
}
```
