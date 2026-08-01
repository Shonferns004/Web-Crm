import { Prisma } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

export const sliderRepository = {
  async list(organizationId: string) {
    return prisma.slider.findMany({
      where: { organizationId },
      orderBy: { updatedAt: 'desc' },
      include: { _count: { select: { slides: true } } },
    });
  },

  async findById(id: string) {
    return prisma.slider.findUnique({ where: { id } });
  },

  async findByIdInOrg(id: string, organizationId: string) {
    return prisma.slider.findFirst({
      where: { id, organizationId },
      include: {
        slides: { orderBy: { sortOrder: 'asc' } },
      },
    });
  },

  async create(organizationId: string, data: { name: string; isActive?: boolean }) {
    return prisma.slider.create({ data: { organizationId, ...data } });
  },

  async update(id: string, data: Prisma.SliderUpdateInput) {
    return prisma.slider.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.slider.delete({ where: { id } });
  },

  async findSlide(id: string) {
    return prisma.sliderSlide.findUnique({ where: { id } });
  },

  async createSlide(organizationId: string, sliderId: string, data: Omit<Prisma.SliderSlideUncheckedCreateInput, 'sliderId' | 'organizationId'>) {
    return prisma.sliderSlide.create({
      data: { ...data, organizationId, sliderId },
    });
  },

  async updateSlide(id: string, data: Prisma.SliderSlideUpdateInput) {
    return prisma.sliderSlide.update({ where: { id }, data });
  },

  async deleteSlide(id: string) {
    return prisma.sliderSlide.delete({ where: { id } });
  },

  async updateSlideOrder(organizationId: string, orderedIds: string[]) {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.sliderSlide.updateMany({
          where: { id, organizationId },
          data: { sortOrder: index + 1 },
        }),
      ),
    );
    return orderedIds;
  },
};
