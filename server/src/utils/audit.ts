import type { Request } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../libs/prisma';

interface AuditParams {
  userId?: string;
  organizationId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  message?: string;
  before?: Prisma.InputJsonValue;
  after?: Prisma.InputJsonValue;
  req?: Request;
}

export async function recordAudit(params: AuditParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId ?? null,
        organizationId: params.organizationId ?? null,
        action: params.action,
        resource: params.resource,
        resourceId: params.resourceId ?? null,
        message: params.message ?? null,
        before: params.before ?? Prisma.JsonNull,
        after: params.after ?? Prisma.JsonNull,
        ipAddress: params.req?.ip ?? null,
        userAgent: params.req?.get('user-agent') ?? null,
      },
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}
