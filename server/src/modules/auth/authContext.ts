import { prisma } from '../../libs/prisma';
import { ApiError } from '../../utils/ApiError';
import type { AuthUser } from '../../types';

/**
 * Build an AuthUser from DB with union of permissions across all memberships
 * and platform roles. Used when issuing access tokens.
 */
export async function buildAuthUser(userId: string): Promise<AuthUser> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      isMaster: true,
      isActive: true,
      roles: {
        select: {
          role: {
            select: {
              key: true,
              permissions: { select: { permission: { select: { code: true } } } },
            },
          },
        },
      },
      memberships: {
        select: {
          isActive: true,
          role: {
            select: {
              permissions: { select: { permission: { select: { code: true } } } },
            },
          },
        },
      },
      permissions: { select: { permission: { select: { code: true } } } },
    },
  });

  if (!user || !user.isActive) {
    throw ApiError.unauthorized('User not found or deactivated');
  }

  const permissions = new Set<string>(user.permissions.map((p) => p.permission.code));
  for (const role of user.roles) {
    for (const rp of role.role.permissions) {
      permissions.add(rp.permission.code);
    }
  }
  for (const membership of user.memberships) {
    if (!membership.isActive) continue;
    for (const rp of membership.role.permissions) {
      permissions.add(rp.permission.code);
    }
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isMaster: user.isMaster,
    roles: user.roles.map((r) => r.role.key),
    permissions: Array.from(permissions),
  };
}
