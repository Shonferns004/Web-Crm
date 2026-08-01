import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { prisma } from '../libs/prisma';
import { ApiError } from '../utils/ApiError';
import type { ActiveOrg } from '../types';

export function orgScope(required = true): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return next(ApiError.unauthorized());
      }

      if (req.user.isMaster) {
        const headerOrgId = req.header('x-organization-id');
        if (headerOrgId) {
          const org = await prisma.organization.findUnique({
            where: { id: headerOrgId },
            select: { id: true, slug: true, name: true },
          });
          if (org) req.activeOrg = org;
        }
        return next();
      }

      const requestedOrgId =
        req.header('x-organization-id') ||
        (req.body && (req.body as { organizationId?: string }).organizationId) ||
        req.params.organizationId;

      if (req.user.roles.includes('admins')) {
        if (!requestedOrgId) return next();
        const assignment = await prisma.organizationAssignment.findUnique({
          where: {
            organizationId_userId: {
              organizationId: requestedOrgId,
              userId: req.user.id,
            },
          },
          select: {
            organization: { select: { id: true, slug: true, name: true } },
          },
        });
        if (!assignment) {
          if (required) return next(ApiError.forbidden('Not assigned to this organization'));
          return next();
        }
        req.activeOrg = assignment.organization;
        return next();
      }

      const membership = requestedOrgId
        ? await prisma.organizationUser.findUnique({
            where: {
              organizationId_userId: {
                organizationId: requestedOrgId,
                userId: req.user.id,
              },
            },
            select: {
              isActive: true,
              organization: { select: { id: true, slug: true, name: true } },
              role: {
                select: {
                  permissions: { select: { permission: { select: { code: true } } } },
                },
              },
            },
          })
        : null;

      if (!membership || !membership.isActive) {
        if (required) {
          return next(ApiError.forbidden('Not a member of this organization'));
        }
        return next();
      }

      const activeOrg: ActiveOrg = {
        id: membership.organization.id,
        slug: membership.organization.slug,
        name: membership.organization.name,
      };
      req.activeOrg = activeOrg;

      req.user.permissions = membership.role.permissions.map((p) => p.permission.code);

      return next();
    } catch (error) {
      return next(error);
    }
  };
}
