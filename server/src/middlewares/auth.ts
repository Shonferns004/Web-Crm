import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { prisma } from '../libs/prisma';
import { ApiError } from '../utils/ApiError';
import { verifyAccessToken } from '../utils/jwt';
import type { AuthUser } from '../types';

export function extractBearerToken(header: string | undefined): string | null {
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
  return null;
}

export function authenticate(required = true): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = extractBearerToken(req.headers.authorization);
      if (!token) {
        if (required) return next(ApiError.unauthorized('Missing access token'));
        return next();
      }

      let payload;
      try {
        payload = verifyAccessToken(token);
      } catch {
        return next(ApiError.unauthorized('Invalid or expired access token'));
      }

      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
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
              organizationId: true,
              isActive: true,
              role: { select: { key: true, permissions: { select: { permission: { select: { code: true } } } } } },
            },
          },
          permissions: { select: { permission: { select: { code: true } } } },
        },
      });

      if (!user || !user.isActive) {
        return next(ApiError.unauthorized('User not found or deactivated'));
      }

      const orgIds = user.memberships.filter((m) => m.isActive).map((m) => m.organizationId);
      const platformRoles = user.roles.map((r) => r.role.key);
      const allPermissions = new Set<string>(user.permissions.map((p) => p.permission.code));
      for (const role of user.roles) {
        for (const rp of role.role.permissions) {
          allPermissions.add(rp.permission.code);
        }
      }
      for (const m of user.memberships) {
        for (const rp of m.role.permissions) {
          allPermissions.add(rp.permission.code);
        }
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isMaster: user.isMaster,
        roles: platformRoles,
        permissions: Array.from(allPermissions),
      };

      (req as Request & { user: AuthUser; orgIds: string[] }).user = authUser;
      (req as Request & { orgIds: string[] }).orgIds = orgIds;

      return next();
    } catch (error) {
      return next(error);
    }
  };
}
