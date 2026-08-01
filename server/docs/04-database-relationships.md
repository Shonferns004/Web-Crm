# 04 — Database Relationships

## Core Tenancy

```
Organization 1 ────< OrganizationUser >──── User 1
     │                    │
     │                    +── Role 1 ────< RolePermission >──── Permission
     │
     ├──< OrganizationSetting   (1 org → many settings)
     ├──< Department ──< Employee
     ├──< Location
     ├──< Account ──< Transaction
     ├──< Donation >── Donor
     ├──< Receipt
     └── (every tenant table below)
```

## Website / CMS

```
Organization 1 ────< Page ──< PageSection (content JSON inline on the section)
Organization ──< SectionTemplate (platform built-ins have organizationId null)
Organization ──< Menu ──< MenuItem (self-parent via parent_id)
Organization ──< Slider ──< SliderSlide
Organization ──< Banner
Organization ──< Media
```

A section may reference entities by id (e.g. a `projects-grid` section lists `projectId` values). The `site` endpoint resolves those references into the JSON tree.

## Entity Relationships

```
Organization 1 ──< Project ──< ProjectImage
                      ├──< ProjectService
                      ├──< ProjectImpact
                      └──< ProjectStat

Organization 1 ──< BlogCategory ──< Blog
Organization 1 ──< Gallery ──< GalleryItem
Organization 1 ──< DocumentCategory ──< Document
Organization 1 ──< Campaign
Organization 1 ──< Testimonial / Partner / FAQ / Award
Organization 1 ──< Volunteer / Beneficiary
```

## Key Relationship Rules

| Rule | Detail |
|------|--------|
| Cascade deletes | Child rows delete with parent (e.g. `PageSection` with `Page`, `ProjectImage` with `Project`). |
| Restrict deletes | `Organization` cannot be deleted while tenant rows reference it (guard in service). |
| Membership | `OrganizationUser.roleId` links a role; a user's active org is `OrganizationUser` where `is_current = true`. |
| Donation → Donor | `donor_id` optional; a donation may be anonymous. |
| Media ownership | Every `Media` row belongs to one organization; deletions must also purge the Supabase Storage object. |

## Referential Actions (defaults)

- All child FKs: `onDelete: Cascade`.
- `Organization` FK on tenant tables: `onDelete: Cascade` (soft-guarded by service-level checks to avoid accidental mass deletion).
- `User` referenced by `Employee.userId`: `onDelete: SetNull`.
