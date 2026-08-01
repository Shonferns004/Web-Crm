import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

export const roleRepository = {
  async listRoles() {
    return prisma.role.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { memberships: true } },
        permissions: { select: { permission: { select: { code: true } } } },
      },
    });
  },

  async listPermissions() {
    return prisma.permission.findMany({ orderBy: [{ resource: 'asc' }, { action: 'asc' }] });
  },

  async findById(id: string) {
    return prisma.role.findUnique({
      where: { id },
      include: {
        permissions: { select: { permission: { select: { id: true, code: true } } } },
      },
    });
  },

  async findByKey(key: string) {
    return prisma.role.findUnique({ where: { key } });
  },

  async create(data: Prisma.RoleCreateInput) {
    return prisma.role.create({ data });
  },

  async update(id: string, data: Prisma.RoleUpdateInput) {
    return prisma.role.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.role.delete({ where: { id } });
  },

  async replacePermissions(roleId: string, permissionIds: string[]) {
    await prisma.rolePermission.deleteMany({ where: { roleId } });
    if (permissionIds.length > 0) {
      await prisma.rolePermission.createMany({
        data: permissionIds.map((permissionId) => ({ roleId, permissionId })),
      });
    }
  },

  async findPermissionCodes(codes: string[]) {
    return prisma.permission.findMany({ where: { code: { in: codes } } });
  },
};
