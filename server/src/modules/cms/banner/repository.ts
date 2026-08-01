import { Prisma } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

export const bannerRepository = {
  async list(organizationId: string, includeInactive = true) {
    return prisma.banner.findMany({
      where: { organizationId, ...(includeInactive ? {} : { isActive: true }) },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  },

  async findById(id: string) {
    return prisma.banner.findUnique({ where: { id } });
  },

  async create(organizationId: string, data: Prisma.BannerCreateWithoutOrganizationInput) {
    return prisma.banner.create({ data: { ...data, organizationId } });
  },

  async update(id: string, data: Prisma.BannerUpdateInput) {
    return prisma.banner.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.banner.delete({ where: { id } });
  },
};
