import type { Request } from 'express';
import { SectionTemplateScope } from '@prisma/client';
import { ApiError } from '../../../utils/ApiError';
import { recordAudit } from '../../../utils/audit';
import { prisma } from '../../../libs/prisma';
import { sectionTemplateRepository } from './repository';
import type {
  CreateSectionTemplateInput,
  UpdateSectionTemplateInput,
} from './schema';

export const sectionTemplateService = {
  async list(organizationId?: string) {
    return sectionTemplateRepository.listVisible(organizationId);
  },

  async create(
    organizationId: string | undefined,
    input: CreateSectionTemplateInput,
    req: Request,
  ) {
    if (!organizationId) {
      throw ApiError.badRequest('Organization context is required to create a section template');
    }

    const existing = await prisma.sectionTemplate.findUnique({
      where: { organizationId_type: { organizationId, type: input.type } },
    });
    if (existing) {
      throw ApiError.conflict('A section template with this type already exists', 'type');
    }

    const template = await sectionTemplateRepository.create({
      organizationId,
      type: input.type,
      name: input.name,
      label: input.label,
      description: input.description ?? null,
      scope: SectionTemplateScope.ORGANIZATION,
      isSystem: false,
      fields: input.fields as never,
    });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'section',
      resourceId: template.id,
      message: `Section template created: ${input.name}`,
      req,
    });

    return template;
  },

  async update(
    organizationId: string | undefined,
    id: string,
    input: UpdateSectionTemplateInput,
    req: Request,
  ) {
    const template = await sectionTemplateRepository.findById(id);
    if (!template) throw ApiError.notFound('Section template not found');
    if (template.isSystem) {
      throw ApiError.forbidden('Built-in section templates are read-only');
    }
    if (!req.user?.isMaster && template.organizationId !== organizationId) {
      throw ApiError.notFound('Section template not found');
    }

    if (input.type && input.type !== template.type) {
      const orgId = template.organizationId;
      if (orgId) {
        const conflict = await prisma.sectionTemplate.findUnique({
          where: { organizationId_type: { organizationId: orgId, type: input.type } },
        });
        if (conflict) {
          throw ApiError.conflict('A section template with this type already exists', 'type');
        }
      }
    }

    const updated = await sectionTemplateRepository.update(id, {
      type: input.type,
      name: input.name,
      label: input.label,
      description: input.description === undefined ? undefined : input.description,
      fields: input.fields === undefined ? undefined : (input.fields as never),
    });

    await recordAudit({
      userId: req.user?.id,
      organizationId: template.organizationId ?? undefined,
      action: 'UPDATE',
      resource: 'section',
      resourceId: id,
      message: `Section template updated: ${updated.name}`,
      req,
    });

    return updated;
  },

  async remove(organizationId: string | undefined, id: string, req: Request) {
    const template = await sectionTemplateRepository.findById(id);
    if (!template) throw ApiError.notFound('Section template not found');
    if (template.isSystem) {
      throw ApiError.forbidden('Built-in section templates are read-only');
    }
    if (!req.user?.isMaster && template.organizationId !== organizationId) {
      throw ApiError.notFound('Section template not found');
    }

    const orgId = template.organizationId;
    if (orgId) {
      const inUse = await sectionTemplateRepository.countSectionsUsingType(orgId, template.type);
      if (inUse > 0) {
        throw ApiError.conflict(
          `Cannot delete: this template is used by ${inUse} section(s)`,
        );
      }
    }

    await sectionTemplateRepository.delete(id);

    await recordAudit({
      userId: req.user?.id,
      organizationId: orgId ?? undefined,
      action: 'DELETE',
      resource: 'section',
      resourceId: id,
      message: `Section template deleted: ${template.name}`,
      req,
    });

    return true;
  },

  async resolveForType(organizationId: string, type: string) {
    return sectionTemplateRepository.findByType(organizationId, type);
  },
};
