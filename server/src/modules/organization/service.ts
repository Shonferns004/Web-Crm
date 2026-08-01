import type { Request } from 'express';
import type { AuthUser } from '../../types';
import { prisma } from '../../libs/prisma';
import { ApiError } from '../../utils/ApiError';
import { hashPassword, generateRandomPassword } from '../../utils/password';
import { recordAudit } from '../../utils/audit';
import { buildPaginated, type Paginated } from '../../utils/pagination';
import { slugify } from '../entities/factory';
import { organizationRepository, type ListParams } from './repository';
import { createOrganizationDefaults } from '../../services/onboarding';
import type {
  CreateOrganizationInput,
  CreateSiteUserInput,
  UpdateOrganizationInput,
  UpdateSettingsInput,
} from './schema';

const WEBSITE_USER_ROLE_KEY = 'website_user';

export function isPlatformAdmin(user: AuthUser): boolean {
  return user.roles.includes('admins');
}

async function resolveUniqueSlug(base: string): Promise<string> {
  let candidate = base;
  let i = 2;
  while (await organizationRepository.findBySlug(candidate)) {
    candidate = `${base}-${i}`;
    i += 1;
  }
  return candidate;
}

async function resolveUniqueSiteUserEmail(slug: string): Promise<string> {
  let email = `site@${slug}.webcrm.local`;
  let i = 2;
  while (await prisma.user.findUnique({ where: { email } })) {
    email = `site${i}@${slug}.webcrm.local`;
    i += 1;
  }
  return email;
}

/**
 * Verify the requesting user may manage the given organization.
 * Master may manage everything; platform admins may manage only
 * organizations assigned to them by the master.
 */
export async function assertCanManageOrg(req: Request, organizationId: string): Promise<void> {
  if (!req.user) throw ApiError.unauthorized();
  if (req.user.isMaster) return;

  if (isPlatformAdmin(req.user)) {
    const assignment = await organizationRepository.findAssignment(organizationId, req.user.id);
    if (!assignment) {
      throw ApiError.forbidden('Not assigned to this organization');
    }
    return;
  }

  throw ApiError.forbidden('Not allowed to manage this organization');
}

async function findOrgOrThrow(id: string) {
  const org = await organizationRepository.findById(id);
  if (!org) throw ApiError.notFound('Organization not found');
  return org;
}

export const organizationService = {
  async list(params: ListParams, user?: AuthUser): Promise<Paginated<unknown>> {
    const assignedTo = user && !user.isMaster && isPlatformAdmin(user) ? user.id : undefined;
    const { items, total } = await organizationRepository.list({ ...params, assignedTo });
    return buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take);
  },

  async getById(id: string, req: Request) {
    await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);
    return organizationRepository.findById(id, true);
  },

  async create(input: CreateOrganizationInput, req: Request) {
    const slug = await resolveUniqueSlug(input.slug ?? slugify(input.name));

    const org = await organizationRepository.create({
      name: input.name,
      slug,
      website: input.website,
      email: input.email ?? null,
      phone: input.phone ?? null,
      description: input.description ?? null,
      address: input.address ?? null,
      city: input.city ?? null,
      state: input.state ?? null,
      country: input.country ?? null,
      taxId: input.taxId ?? null,
      plan: input.plan ?? 'free',
    });

    await createOrganizationDefaults(org.id, org.name);

    // Auto-create the website user credential.
    const password = input.adminPassword ?? generateRandomPassword();
    const generated = !input.adminPassword;
    const email = (input.adminEmail ?? '').toLowerCase().trim() || (await resolveUniqueSiteUserEmail(slug));
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          passwordHash: await hashPassword(password),
          firstName: input.adminFirstName ?? org.name.split(' ')[0] ?? 'Site',
          lastName: input.adminLastName ?? 'User',
        },
      });
    }
    const websiteUserRole = await prisma.role.findUnique({ where: { key: WEBSITE_USER_ROLE_KEY } });
    if (websiteUserRole) {
      await organizationRepository.upsertMembership(org.id, user.id, websiteUserRole.id);
    }

    // A platform admin automatically manages websites they create.
    if (req.user && !req.user.isMaster && isPlatformAdmin(req.user)) {
      await organizationRepository.upsertAssignment(org.id, req.user.id);
    }

    await recordAudit({
      userId: req.user?.id,
      organizationId: org.id,
      action: 'CREATE',
      resource: 'organization',
      resourceId: org.id,
      message: `Organization created: ${org.name}`,
      req,
    });

    return {
      ...org,
      webUser: {
        id: user.id,
        email: user.email,
        password: generated ? password : undefined,
        generated,
      },
    };
  },

  async update(id: string, input: UpdateOrganizationInput, req: Request) {
    await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);

    const org = await organizationRepository.update(id, { ...input });

    await recordAudit({
      userId: req.user?.id,
      organizationId: org.id,
      action: 'UPDATE',
      resource: 'organization',
      resourceId: org.id,
      message: `Organization updated: ${org.name}`,
      req,
    });

    return org;
  },

  async remove(id: string, req: Request) {
    const existing = await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);

    const tenantData = await organizationRepository.countTenantData(id);
    const dataKeys = Object.keys(tenantData).filter((key) => tenantData[key] > 0);
    if (dataKeys.length > 0) {
      throw ApiError.conflict(
        `Cannot delete organization: it has existing data (${dataKeys.join(', ')})`,
      );
    }

    await organizationRepository.delete(id);

    await recordAudit({
      userId: req.user?.id,
      organizationId: id,
      action: 'DELETE',
      resource: 'organization',
      resourceId: id,
      message: `Organization deleted: ${existing.name}`,
      req,
    });

    return true;
  },

  async getSettings(id: string, req: Request) {
    await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);
    return organizationRepository.getSettings(id);
  },

  async updateSettings(id: string, input: UpdateSettingsInput, req: Request) {
    await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);

    const updated = await organizationRepository.upsertSettings(id, input.settings);

    await recordAudit({
      userId: req.user?.id,
      organizationId: id,
      action: 'UPDATE',
      resource: 'organization',
      resourceId: id,
      message: 'Organization settings updated',
      req,
    });

    return updated.map((s) => s.key);
  },

  async listUsers(id: string, params: { skip: number; take: number; search?: string }, req: Request) {
    await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);
    const { items, total } = await organizationRepository.listMembers(id, params);
    return buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take);
  },

  async createUser(id: string, input: CreateSiteUserInput, req: Request) {
    await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);

    const email = input.email.toLowerCase().trim();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw ApiError.conflict('User with this email already exists', 'email');
    }

    const role = await prisma.role.findUnique({ where: { key: WEBSITE_USER_ROLE_KEY } });
    if (!role) throw ApiError.badRequest('Website user role is not configured');

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: await hashPassword(input.password),
        firstName: input.firstName,
        lastName: input.lastName ?? null,
        phone: input.phone ?? null,
      },
      select: { id: true, email: true, firstName: true, lastName: true },
    });
    await organizationRepository.upsertMembership(id, user.id, role.id);

    await recordAudit({
      userId: req.user?.id,
      organizationId: id,
      action: 'CREATE',
      resource: 'user',
      resourceId: user.id,
      message: `Website user created: ${user.email}`,
      req,
    });

    return { user, role: { id: role.id, key: role.key, name: role.name } };
  },

  async removeUser(id: string, userId: string, req: Request) {
    await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);

    const membership = await organizationRepository.findMembership(id, userId);
    if (!membership) throw ApiError.notFound('User is not a member of this organization');

    await organizationRepository.removeMembership(id, userId);

    await recordAudit({
      userId: req.user?.id,
      organizationId: id,
      action: 'DELETE',
      resource: 'user',
      resourceId: userId,
      message: `Website user removed from organization: ${membership.user.email}`,
      req,
    });

    return true;
  },

  async listAdmins(id: string, req: Request) {
    await findOrgOrThrow(id);
    await assertCanManageOrg(req, id);
    return organizationRepository.listAdmins(id);
  },

  async assignAdmin(id: string, userId: string, req: Request) {
    await findOrgOrThrow(id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, isMaster: true, roles: { select: { role: { select: { key: true } } } } },
    });
    if (!user) throw ApiError.notFound('User not found');
    if (user.isMaster) throw ApiError.badRequest('Cannot assign the master user');
    if (!user.roles.some((r) => r.role.key === 'admins')) {
      throw ApiError.badRequest('Only platform admins can be assigned to websites');
    }

    const assignment = await organizationRepository.upsertAssignment(id, userId);

    await recordAudit({
      userId: req.user?.id,
      organizationId: id,
      action: 'ASSIGN_ADMIN',
      resource: 'organization',
      resourceId: id,
      message: `Platform admin ${user.email} assigned to organization`,
      req,
    });

    return assignment;
  },

  async removeAdmin(id: string, userId: string, req: Request) {
    await findOrgOrThrow(id);

    const assignment = await organizationRepository.findAssignment(id, userId);
    if (!assignment) throw ApiError.notFound('Admin is not assigned to this organization');

    await organizationRepository.removeAssignment(id, userId);

    await recordAudit({
      userId: req.user?.id,
      organizationId: id,
      action: 'UNASSIGN_ADMIN',
      resource: 'organization',
      resourceId: id,
      message: 'Platform admin unassigned from organization',
      req,
    });

    return true;
  },
};
