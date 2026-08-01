import { Prisma } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

const itemSelect = {
  id: true,
  label: true,
  url: true,
  entityType: true,
  entityId: true,
  parentId: true,
  sortOrder: true,
  isActive: true,
} as const;

export const menuRepository = {
  async list(organizationId: string) {
    return prisma.menu.findMany({
      where: { organizationId },
      orderBy: { updatedAt: 'desc' },
      include: { _count: { select: { items: true } } },
    });
  },

  async findById(id: string) {
    return prisma.menu.findUnique({ where: { id } });
  },

  async findByIdInOrg(id: string, organizationId: string) {
    return prisma.menu.findFirst({
      where: { id, organizationId },
      include: {
        items: {
          where: { parentId: null },
          orderBy: { sortOrder: 'asc' },
          include: {
            children: {
              orderBy: { sortOrder: 'asc' },
              include: {
                children: { orderBy: { sortOrder: 'asc' } },
              },
            },
          },
        },
      },
    });
  },

  async findByLocation(location: string, organizationId: string) {
    return prisma.menu.findFirst({ where: { location, organizationId } });
  },

  async create(organizationId: string, data: { name: string; location: string }) {
    return prisma.menu.create({ data: { organizationId, ...data } });
  },

  async update(id: string, data: Prisma.MenuUpdateInput) {
    return prisma.menu.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.menu.delete({ where: { id } });
  },

  async findItem(id: string) {
    return prisma.menuItem.findUnique({ where: { id }, select: itemSelect });
  },

  async findItemInOrg(id: string, organizationId: string) {
    return prisma.menuItem.findFirst({ where: { id, organizationId }, select: itemSelect });
  },

  async createItem(
    organizationId: string,
    menuId: string,
    data: Omit<Prisma.MenuItemUncheckedCreateInput, 'menuId' | 'organizationId'>,
  ) {
    return prisma.menuItem.create({
      data: { ...data, organizationId, menuId },
      select: itemSelect,
    });
  },

  async updateItem(id: string, data: Prisma.MenuItemUpdateInput) {
    return prisma.menuItem.update({ where: { id }, data, select: itemSelect });
  },

  async deleteItem(id: string) {
    return prisma.menuItem.delete({ where: { id } });
  },

  async updateItemOrder(organizationId: string, orderedIds: string[]) {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.menuItem.updateMany({
          where: { id, organizationId },
          data: { sortOrder: index + 1 },
        }),
      ),
    );
    return orderedIds;
  },
};
