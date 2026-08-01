import type { AuthUser } from '../../types';
import { prisma } from '../../libs/prisma';

export type DashboardScope = {
  orgIds: string[];
  scoped: boolean;
};

const COUNT_SELECT = {
  select: {
    id: true,
    name: true,
    slug: true,
    status: true,
    plan: true,
    createdAt: true,
    _count: {
      select: { users: true, projects: true, pages: true, donations: true },
    },
  },
} as const;

export const dashboardRepository = {
  async orgIdsFor(user: AuthUser): Promise<DashboardScope> {
    if (user.isMaster) {
      const rows = await prisma.organization.findMany({ select: { id: true } });
      return { orgIds: rows.map((r) => r.id), scoped: false };
    }
    if (user.roles.includes('admins')) {
      const rows = await prisma.organizationAssignment.findMany({
        where: { userId: user.id },
        select: { organizationId: true },
      });
      return { orgIds: rows.map((r) => r.organizationId), scoped: true };
    }
    const rows = await prisma.organizationUser.findMany({
      where: { userId: user.id, isActive: true },
      select: { organizationId: true },
    });
    return { orgIds: rows.map((r) => r.organizationId), scoped: true };
  },

  async overview(scope: DashboardScope) {
    const { orgIds } = scope;
    if (orgIds.length === 0) {
      return {
        organizations: 0,
        users: 0,
        projects: 0,
        pages: 0,
        media: 0,
        events: 0,
        campaigns: 0,
        donations: 0,
        recentDonations: [],
      };
    }

    const where = { organizationId: { in: orgIds } };
    const [organizations, users, projects, pages, media, events, campaigns, donations, recentDonations] =
      await Promise.all([
        prisma.organization.count({ where: { id: { in: orgIds } } }),
        prisma.organizationUser.count({ where }),
        prisma.project.count({ where }),
        prisma.page.count({ where }),
        prisma.media.count({ where }),
        prisma.event.count({ where }),
        prisma.campaign.count({ where }),
        prisma.donation.count({ where }),
        prisma.donation.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            donorName: true,
            receiptNumber: true,
            createdAt: true,
            organization: { select: { id: true, slug: true, name: true } },
          },
        }),
      ]);

    return {
      organizations,
      users,
      projects,
      pages,
      media,
      events,
      campaigns,
      donations,
      recentDonations,
    };
  },

  async websites(scope: DashboardScope) {
    if (scope.orgIds.length === 0) return [];
    return prisma.organization.findMany({
      where: { id: { in: scope.orgIds } },
      orderBy: { createdAt: 'desc' },
      ...COUNT_SELECT,
    });
  },

  async siteStats(organizationId: string) {
    const where = { organizationId };
    const [organization, users, projects, pages, media, events, campaigns, donations, recentDonations] =
      await Promise.all([
        prisma.organization.findUnique({ where: { id: organizationId }, ...COUNT_SELECT }),
        prisma.organizationUser.count({ where }),
        prisma.project.count({ where }),
        prisma.page.count({ where }),
        prisma.media.count({ where }),
        prisma.event.count({ where }),
        prisma.campaign.count({ where }),
        prisma.donation.count({ where }),
        prisma.donation.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            donorName: true,
            receiptNumber: true,
            createdAt: true,
          },
        }),
      ]);

    return {
      organization,
      counts: { users, projects, pages, media, events, campaigns, donations },
      recentDonations,
    };
  },
};
