import { Prisma } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

export const sectionTemplateRepository = {
  async listVisible(organizationId?: string) {
    const templates = await prisma.sectionTemplate.findMany({
      where: {
        isActive: true,
        ...(organizationId
          ? { OR: [{ organizationId: null }, { organizationId }] }
          : { organizationId: null }),
      },
      orderBy: { name: 'asc' },
    });

    const byType = new Map<string, (typeof templates)[number]>();
    for (const template of templates) {
      const existing = byType.get(template.type);
      if (!existing || (template.organizationId !== null && existing.organizationId === null)) {
        byType.set(template.type, template);
      }
    }
    return [...byType.values()];
  },

  async listTemplatesForOrg(organizationId: string) {
    return prisma.sectionTemplate.findMany({
      where: {
        isActive: true,
        OR: [{ organizationId: null }, { organizationId }],
      },
    });
  },

  async findById(id: string) {
    return prisma.sectionTemplate.findUnique({ where: { id } });
  },

  async findByType(organizationId: string, type: string) {
    const orgTemplate = await prisma.sectionTemplate.findUnique({
      where: { organizationId_type: { organizationId, type } },
    });
    if (orgTemplate) return orgTemplate;
    return prisma.sectionTemplate.findFirst({
      where: { organizationId: null, type, isActive: true },
    });
  },

  async create(data: Prisma.SectionTemplateUncheckedCreateInput) {
    return prisma.sectionTemplate.create({ data });
  },

  async update(id: string, data: Prisma.SectionTemplateUpdateInput) {
    return prisma.sectionTemplate.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.sectionTemplate.delete({ where: { id } });
  },

  async countSectionsUsingType(organizationId: string, type: string) {
    return prisma.pageSection.count({ where: { organizationId, type } });
  },
};
