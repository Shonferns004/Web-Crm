import { Prisma, OrgStatus } from '@prisma/client';
import { prisma } from '../../libs/prisma';

export interface ListParams {
  skip: number;
  take: number;
  search?: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  status?: OrgStatus;
  /** restrict results to organizations assigned to this platform admin */
  assignedTo?: string;
}

export const organizationRepository = {
  async list(params: ListParams) {
    const where: Prisma.OrganizationWhereInput = {
      ...(params.search
        ? {
            OR: [
              { name: { contains: params.search, mode: 'insensitive' } },
              { slug: { contains: params.search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(params.status ? { status: params.status } : {}),
      ...(params.assignedTo
        ? { assignments: { some: { userId: params.assignedTo } } }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: params.skip,
        take: params.take,
        include: {
          _count: { select: { users: true, projects: true, pages: true, donations: true } },
        },
      }),
      prisma.organization.count({ where }),
    ]);

    return { items, total };
  },

  async findById(id: string, includeCounts = false) {
    return prisma.organization.findUnique({
      where: { id },
      include: includeCounts
        ? { _count: { select: { users: true, projects: true, pages: true, donations: true } } }
        : undefined,
    });
  },

  async findBySlug(slug: string) {
    return prisma.organization.findUnique({ where: { slug } });
  },

  async create(data: Prisma.OrganizationCreateInput) {
    return prisma.organization.create({ data });
  },

  async update(id: string, data: Prisma.OrganizationUpdateInput) {
    return prisma.organization.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.organization.delete({ where: { id } });
  },

  async countTenantData(id: string) {
    const tables: string[] = [
      'organizationSetting',
      'organizationUser',
      'page',
      'media',
      'project',
      'donation',
    ];
    const counts: Record<string, number> = {};
    const delegates = prisma as unknown as Record<
      string,
      { count: (args: { where: { organizationId: string } }) => Promise<number> }
    >;
    for (const table of tables) {
      try {
        counts[table] = await delegates[table].count({ where: { organizationId: id } });
      } catch {
        counts[table] = 0;
      }
    }
    return counts;
  },

  async getSettings(organizationId: string) {
    const rows = await prisma.organizationSetting.findMany({
      where: { organizationId },
      orderBy: { key: 'asc' },
    });
    const settings: Record<string, unknown> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    return settings;
  },

  async upsertSettings(organizationId: string, entries: Record<string, unknown>) {
    const results = [];
    for (const [key, value] of Object.entries(entries)) {
      results.push(
        await prisma.organizationSetting.upsert({
          where: { organizationId_key: { organizationId, key } },
          update: { value: value as Prisma.InputJsonValue },
          create: { organizationId, key, value: value as Prisma.InputJsonValue },
        }),
      );
    }
    return results;
  },

  async assignAdmin(organizationId: string, userId: string, roleId: string) {
    return prisma.organizationUser.upsert({
      where: { organizationId_userId: { organizationId, userId } },
      update: { roleId, isActive: true },
      create: { organizationId, userId, roleId, isActive: true },
    });
  },

  async findAssignment(organizationId: string, userId: string) {
    return prisma.organizationAssignment.findUnique({
      where: { organizationId_userId: { organizationId, userId } },
    });
  },

  async upsertAssignment(organizationId: string, userId: string) {
    return prisma.organizationAssignment.upsert({
      where: { organizationId_userId: { organizationId, userId } },
      update: {},
      create: { organizationId, userId },
    });
  },

  async removeAssignment(organizationId: string, userId: string) {
    return prisma.organizationAssignment.delete({
      where: { organizationId_userId: { organizationId, userId } },
    });
  },

  async listAdmins(organizationId: string) {
    return prisma.organizationAssignment.findMany({
      where: { organizationId },
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isActive: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  },

  async listMembers(organizationId: string, params: { skip: number; take: number; search?: string }) {
    const where: Prisma.OrganizationUserWhereInput = {
      organizationId,
      ...(params.search
        ? {
            user: {
              OR: [
                { firstName: { contains: params.search, mode: 'insensitive' } },
                { lastName: { contains: params.search, mode: 'insensitive' } },
                { email: { contains: params.search, mode: 'insensitive' } },
              ],
            },
          }
        : {}),
    };
    const [items, total] = await Promise.all([
      prisma.organizationUser.findMany({
        where,
        skip: params.skip,
        take: params.take,
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          isCurrent: true,
          isActive: true,
          createdAt: true,
          role: { select: { id: true, key: true, name: true } },
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              isActive: true,
              lastLoginAt: true,
            },
          },
        },
      }),
      prisma.organizationUser.count({ where }),
    ]);
    return { items, total };
  },

  async findMembership(organizationId: string, userId: string) {
    return prisma.organizationUser.findUnique({
      where: { organizationId_userId: { organizationId, userId } },
      include: {
        role: { select: { id: true, key: true, name: true } },
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });
  },

  async upsertMembership(organizationId: string, userId: string, roleId: string) {
    return prisma.organizationUser.upsert({
      where: { organizationId_userId: { organizationId, userId } },
      update: { roleId, isActive: true },
      create: { organizationId, userId, roleId, isActive: true },
    });
  },

  async removeMembership(organizationId: string, userId: string) {
    return prisma.organizationUser.delete({
      where: { organizationId_userId: { organizationId, userId } },
    });
  },
};
