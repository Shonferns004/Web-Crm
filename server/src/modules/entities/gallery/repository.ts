import type { Prisma } from '@prisma/client';
import { prisma } from '../../../libs/prisma';
import { slugify } from '../factory';

interface GalleryItemInput {
  mediaId?: string | null;
  imageUrl: string;
  altText?: string | null;
  caption?: string | null;
  sortOrder?: number;
}

const include = {
  items: { orderBy: { sortOrder: 'asc' as const } },
};

export const galleryRepository = {
  async list(organizationId: string, params: {
    skip: number;
    take: number;
    search?: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    status?: string;
  }) {
    const where: Prisma.GalleryWhereInput = {
      organizationId,
      ...(params.search
        ? { OR: [
            { title: { contains: params.search, mode: 'insensitive' as const } },
            { description: { contains: params.search, mode: 'insensitive' as const } },
          ] }
        : {}),
      ...(params.status ? { status: params.status as Prisma.GalleryWhereInput['status'] } : {}),
    };
    const [items, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: params.skip,
        take: params.take,
        include: { _count: { select: { items: true } } },
      }),
      prisma.gallery.count({ where }),
    ]);
    return { items, total };
  },

  async findById(id: string) {
    return prisma.gallery.findUnique({ where: { id }, include });
  },

  async create(organizationId: string, data: Record<string, unknown>) {
    const { items, ...fields } = data;
    const payload = fields as Record<string, unknown>;
    if (!payload.slug && payload.title) {
      payload.slug = slugify(String(payload.title));
    }
    return prisma.gallery.create({
      data: {
        ...payload,
        organizationId,
        items: {
          create: (items as GalleryItemInput[] | undefined)?.map((item) => ({ ...item, organizationId })) ?? [],
        },
      } as Prisma.GalleryUncheckedCreateInput,
      include,
    });
  },

  async update(id: string, data: Record<string, unknown>) {
    const { items, ...fields } = data;
    const existing = await prisma.gallery.findUnique({ where: { id }, select: { organizationId: true } });
    if (!existing) return null;
    const payload = fields as Record<string, unknown>;
    return prisma.gallery.update({
      where: { id },
      data: {
        ...payload,
        items: items
          ? {
              deleteMany: {},
              create: (items as GalleryItemInput[]).map((item) => ({ ...item, organizationId: existing.organizationId })),
            }
          : undefined,
      },
      include,
    });
  },

  async remove(id: string) {
    return prisma.gallery.delete({ where: { id } });
  },
};
