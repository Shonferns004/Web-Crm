# 08 — Multitenancy

## Model

- **Single shared schema**, every tenant table has `organization_id UUID NOT NULL` FK → `Organization`.
- No dynamic databases, no schema-per-tenant. Onboarding a new NGO = inserting rows.

## How the Active Organization Is Resolved

Every tenant request goes through this flow:

```
Request
  ├─ auth middleware        → verifies JWT, loads req.user (id, roles, permissions, orgs)
  ├─ rbac middleware        → asserts required permission (when specified)
  └─ orgScope middleware    → reads X-Organization-Id header
                              → website users: looks up OrganizationUser (userId, orgId, isActive)
                              → platform admins: looks up OrganizationAssignment (userId, orgId)
                              → attaches req.activeOrg { id, slug, name }
```

- The header value is **never trusted** for filtering alone; it must match a real membership (website user) or assignment (platform admin) row for the authenticated user.
- If no header is sent, the middleware uses the user's `is_current` org from JWT claims as fallback; otherwise `400`.

## Enforcement Rules

1. Repositories accept the `organizationId` and filter every query by it.
2. Services pass `activeOrg.id` — never ids from request params directly.
3. When a client targets a resource id belonging to another org, the row "does not exist" → service returns `403 Forbidden`.
4. Reads of lists always scope to the active org.

## Master vs Admin vs Website User

| Who | Can do |
|-----|--------|
| Master (`isMaster`) | Everything, all orgs, all users; creates platform admins; bypasses org membership (no `X-Organization-Id` required). |
| Platform admin (`admins`) | Creates websites (name + URL) and manages the ones they created/are assigned (`OrganizationAssignment`): site stats, create/assign/remove website users, edit settings. Cannot delete websites or assign other admins. |
| Website user (`website_user`) | Customize **one** website (membership): pages, sections, menus, media, banners, sliders, settings + read-only entities. No CRM/finance writes. |

Auto-created credentials: `POST /organizations` provisions a `website_user` account automatically and returns `webUser { email, password }` in the response — the frontend displays it once; the admin hands it to the site owner, who logs in at the website panel.

## RBAC + Tenancy Combined

- Permissions are checked against the user's platform roles (union across memberships).
- A user who belongs to multiple orgs carries a permission set per org; `orgScope` selects the right one.
- Global platform permissions (e.g. `organization:delete`, `organization:assign`) are only granted to the master role; `organization:create` is also granted to platform admins.

## Scaling to 1000+ Orgs

- Org id is UUID; all tenant queries are index-backed (`organization_id` composite with entity id).
- Content is JSON per section → schema stays stable as content types grow.
- Adding an org requires no migration and no code change.

## Security Notes

- Cross-tenant access is treated as a security event: audit-logged.
- The `site` endpoint is the only public tenant-facing route; it is keyed by `organizationSlug` and returns only `published` content.
