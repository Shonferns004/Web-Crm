import type { Request } from 'express';
import { ApiError } from '../../../utils/ApiError';
import { recordAudit } from '../../../utils/audit';
import { bannerRepository } from './repository';
import type { CreateBannerInput, UpdateBannerInput } from './schema';

function assertOwned<T extends { id: string; organizationId: string }>(
  banner: T | null,
  organizationId: string,
): T {
  if (!banner || banner.organizationId !== organizationId) {
    throw ApiError.notFound('Banner not found');
  }
  return banner;
}

export const bannerService = {
  async list(organizationId: string) {
    return bannerRepository.list(organizationId);
  },

  async create(organizationId: string, input: CreateBannerInput, req: Request) {
    const banner = await bannerRepository.create(organizationId, {
      title: input.title,
      subtitle: input.subtitle ?? null,
      imageUrl: input.imageUrl ?? null,
      mobileImageUrl: input.mobileImageUrl ?? null,
      linkUrl: input.linkUrl ?? null,
      ctaLabel: input.ctaLabel ?? null,
      position: input.position ?? 'top',
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder ?? 0,
    });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'banner',
      resourceId: banner.id,
      message: `Banner created: ${banner.title}`,
      req,
    });

    return banner;
  },

  async update(organizationId: string, id: string, input: UpdateBannerInput, req: Request) {
    const existing = await bannerRepository.findById(id);
    assertOwned(existing, organizationId);

    const banner = await bannerRepository.update(id, { ...input });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'banner',
      resourceId: id,
      message: `Banner updated: ${banner.title}`,
      req,
    });

    return banner;
  },

  async remove(organizationId: string, id: string, req: Request) {
    const existing = await bannerRepository.findById(id);
    const banner = assertOwned(existing, organizationId);

    await bannerRepository.delete(id);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'DELETE',
      resource: 'banner',
      resourceId: id,
      message: `Banner deleted: ${banner.title}`,
      req,
    });

    return true;
  },
};
