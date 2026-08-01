import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

export interface ListParams {
  organizationId: string;
  skip: number;
  take: number;
  entityType?: string;
  entityId?: string;
  mimeType?: string;
}

export interface CreateMediaInput {
  organizationId: string;
  fileName: string;
  mimeType: string;
  size: number;
  bucket: string;
  key: string;
  url: string;
  thumbnailUrl?: string;
  entityType?: string;
  entityId?: string;
  uploadedById?: string;
}

export const mediaRepository = {
  async list(params: ListParams) {
    const where: Prisma.MediaWhereInput = {
      organizationId: params.organizationId,
      ...(params.entityType ? { entityType: params.entityType } : {}),
      ...(params.entityId ? { entityId: params.entityId } : {}),
      ...(params.mimeType ? { mimeType: params.mimeType } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: params.skip,
        take: params.take,
      }),
      prisma.media.count({ where }),
    ]);

    return { items, total };
  },

  async create(input: CreateMediaInput) {
    return prisma.media.create({
      data: {
        organizationId: input.organizationId,
        fileName: input.fileName,
        mimeType: input.mimeType,
        size: input.size,
        bucket: input.bucket,
        key: input.key,
        url: input.url,
        thumbnailUrl: input.thumbnailUrl ?? null,
        entityType: input.entityType ?? null,
        entityId: input.entityId ?? null,
        uploadedById: input.uploadedById ?? null,
      },
    });
  },

  async findById(id: string) {
    return prisma.media.findUnique({ where: { id } });
  },

  async delete(id: string) {
    return prisma.media.delete({ where: { id } });
  },
};
