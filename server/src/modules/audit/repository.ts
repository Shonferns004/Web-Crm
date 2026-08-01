import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

export interface ListParams {
  organizationId?: string;
  skip: number;
  take: number;
  action?: string;
  resource?: string;
  userId?: string;
  from?: Date;
  to?: Date;
}

export const auditRepository = {
  async list(params: ListParams) {
    const where: Prisma.AuditLogWhereInput = {
      ...(params.organizationId ? { organizationId: params.organizationId } : {}),
      ...(params.action ? { action: params.action } : {}),
      ...(params.resource ? { resource: params.resource } : {}),
      ...(params.userId ? { userId: params.userId } : {}),
      ...(params.from || params.to
        ? {
            createdAt: {
              ...(params.from ? { gte: params.from } : {}),
              ...(params.to ? { lte: params.to } : {}),
            },
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: params.skip,
        take: params.take,
        include: {
          user: { select: { id: true, email: true, firstName: true, lastName: true } },
          organization: { select: { id: true, name: true, slug: true } },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return { items, total };
  },
};
