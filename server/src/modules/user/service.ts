import type { Request } from 'express';
import { prisma } from '../../libs/prisma';
import { ApiError } from '../../utils/ApiError';
import { hashPassword } from '../../utils/password';
import { recordAudit } from '../../utils/audit';
import { buildPaginated, type Paginated } from '../../utils/pagination';
import { userRepository, type ListParams } from './repository';
import type { AssignOrgInput, CreateUserInput, UpdateUserInput } from './schema';

export const userService = {
  async list(params: ListParams, user?: import('../../types').AuthUser): Promise<Paginated<unknown>> {
    let organizationIds: string[] | undefined;
    if (user && !user.isMaster && user.roles.includes('admins')) {
      const rows = await prisma.organizationAssignment.findMany({
        where: { userId: user.id },
        select: { organizationId: true },
      });
      organizationIds = rows.map((r) => r.organizationId);
    }
    const { items, total } = await userRepository.list({ ...params, organizationIds });
    return buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take);
  },

  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw ApiError.notFound('User not found');
    return user;
  },

  async create(input: CreateUserInput, req: Request) {
    const existing = await userRepository.findByEmail(input.email.toLowerCase().trim());
    if (existing) throw ApiError.conflict('User with this email already exists', 'email');

    if (input.role && !req.user?.isMaster) {
      throw ApiError.forbidden('Only the platform master can assign platform roles');
    }

    const user = await userRepository.create({
      email: input.email.toLowerCase().trim(),
      passwordHash: await hashPassword(input.password),
      firstName: input.firstName,
      lastName: input.lastName ?? null,
      phone: input.phone ?? null,
      avatarUrl: input.avatarUrl ?? null,
      isActive: input.isActive ?? true,
    });

    if (input.role) {
      const role = await prisma.role.findUnique({ where: { key: input.role } });
      if (role) {
        await prisma.userRole.upsert({
          where: { userId_roleId: { userId: user.id, roleId: role.id } },
          update: {},
          create: { userId: user.id, roleId: role.id },
        });
      }
    }

    await recordAudit({
      userId: req.user?.id,
      action: 'CREATE',
      resource: 'user',
      resourceId: user.id,
      message: `User created: ${user.email}`,
      req,
    });

    return user;
  },

  async update(id: string, input: UpdateUserInput, req: Request) {
    const existing = await userRepository.findById(id);
    if (!existing) throw ApiError.notFound('User not found');

    const data: Record<string, unknown> = { ...input };
    if (input.email) data.email = input.email.toLowerCase().trim();
    if (input.password) data.passwordHash = await hashPassword(input.password);
    delete data.password;

    const user = await userRepository.update(id, data as never);

    await recordAudit({
      userId: req.user?.id,
      action: 'UPDATE',
      resource: 'user',
      resourceId: id,
      message: `User updated: ${user.email}`,
      req,
    });

    return user;
  },

  async remove(id: string, req: Request) {
    const existing = await userRepository.findById(id);
    if (!existing) throw ApiError.notFound('User not found');
    if (existing.isMaster) throw ApiError.forbidden('Cannot delete the platform master user');

    await userRepository.delete(id);

    await recordAudit({
      userId: req.user?.id,
      action: 'DELETE',
      resource: 'user',
      resourceId: id,
      message: `User deleted: ${existing.email}`,
      req,
    });

    return true;
  },

  async assignOrg(userId: string, input: AssignOrgInput, req: Request) {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.notFound('User not found');

    const org = await prisma.organization.findUnique({ where: { id: input.organizationId } });
    if (!org) throw ApiError.notFound('Organization not found');

    const role = await prisma.role.findUnique({ where: { id: input.roleId } });
    if (!role) throw ApiError.notFound('Role not found');

    const membership = await userRepository.assignOrg(
      input.organizationId,
      userId,
      input.roleId,
      input.isCurrent ?? false,
    );

    if (input.isCurrent) {
      await userRepository.setCurrentOrg(userId, input.organizationId);
    }

    await recordAudit({
      userId: req.user?.id,
      organizationId: input.organizationId,
      action: 'ASSIGN_ORG',
      resource: 'user',
      resourceId: userId,
      message: `User assigned to organization ${org.name} with role ${role.name}`,
      req,
    });

    return membership;
  },

  async removeFromOrg(userId: string, organizationId: string, req: Request) {
    const membership = await userRepository.findMembership(organizationId, userId);
    if (!membership) throw ApiError.notFound('Membership not found');

    await userRepository.removeFromOrg(organizationId, userId);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'REMOVE_ORG',
      resource: 'user',
      resourceId: userId,
      message: 'User removed from organization',
      req,
    });

    return true;
  },

  async memberships(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.notFound('User not found');
    return user.memberships;
  },
};
