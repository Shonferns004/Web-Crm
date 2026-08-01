import type { Request } from 'express';
import { ApiError } from '../../../utils/ApiError';
import { recordAudit } from '../../../utils/audit';
import { sliderRepository } from './repository';
import type {
  CreateSlideInput,
  CreateSliderInput,
  ReorderSlidesInput,
  UpdateSlideInput,
  UpdateSliderInput,
} from './schema';

function assertOwned<T extends { id: string; organizationId: string }>(
  slider: T | null,
  organizationId: string,
): T {
  if (!slider || slider.organizationId !== organizationId) {
    throw ApiError.notFound('Slider not found');
  }
  return slider;
}

export const sliderService = {
  async list(organizationId: string) {
    return sliderRepository.list(organizationId);
  },

  async getById(organizationId: string, id: string) {
    const slider = await sliderRepository.findByIdInOrg(id, organizationId);
    if (!slider) throw ApiError.notFound('Slider not found');
    return slider;
  },

  async create(organizationId: string, input: CreateSliderInput, req: Request) {
    const slider = await sliderRepository.create(organizationId, input);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'slider',
      resourceId: slider.id,
      message: `Slider created: ${slider.name}`,
      req,
    });

    return slider;
  },

  async update(organizationId: string, id: string, input: UpdateSliderInput, req: Request) {
    const existing = await sliderRepository.findById(id);
    assertOwned(existing, organizationId);

    const slider = await sliderRepository.update(id, { ...input });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'slider',
      resourceId: id,
      message: `Slider updated: ${slider.name}`,
      req,
    });

    return slider;
  },

  async remove(organizationId: string, id: string, req: Request) {
    const existing = await sliderRepository.findById(id);
    const slider = assertOwned(existing, organizationId);

    await sliderRepository.delete(id);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'DELETE',
      resource: 'slider',
      resourceId: id,
      message: `Slider deleted: ${slider.name}`,
      req,
    });

    return true;
  },

  async addSlide(organizationId: string, sliderId: string, input: CreateSlideInput, req: Request) {
    const slider = await sliderRepository.findById(sliderId);
    assertOwned(slider, organizationId);

    const slide = await sliderRepository.createSlide(organizationId, sliderId, {
      title: input.title,
      subtitle: input.subtitle ?? null,
      imageUrl: input.imageUrl,
      mobileImageUrl: input.mobileImageUrl ?? null,
      ctaLabel: input.ctaLabel ?? null,
      ctaUrl: input.ctaUrl ?? null,
      altText: input.altText ?? null,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
    });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'slider',
      resourceId: sliderId,
      message: `Slide added: ${slide.title}`,
      req,
    });

    return slide;
  },

  async updateSlide(
    organizationId: string,
    sliderId: string,
    slideId: string,
    input: UpdateSlideInput,
    req: Request,
  ) {
    const slider = await sliderRepository.findById(sliderId);
    assertOwned(slider, organizationId);

    const existing = await sliderRepository.findSlide(slideId);
    if (!existing || existing.sliderId !== sliderId) {
      throw ApiError.notFound('Slide not found on this slider');
    }

    const slide = await sliderRepository.updateSlide(slideId, { ...input });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'slider',
      resourceId: sliderId,
      message: `Slide updated: ${slide.title}`,
      req,
    });

    return slide;
  },

  async removeSlide(
    organizationId: string,
    sliderId: string,
    slideId: string,
    req: Request,
  ) {
    const slider = await sliderRepository.findById(sliderId);
    assertOwned(slider, organizationId);

    const existing = await sliderRepository.findSlide(slideId);
    if (!existing || existing.sliderId !== sliderId) {
      throw ApiError.notFound('Slide not found on this slider');
    }

    await sliderRepository.deleteSlide(slideId);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'DELETE',
      resource: 'slider',
      resourceId: sliderId,
      message: `Slide deleted: ${existing.title}`,
      req,
    });

    return true;
  },

  async reorderSlides(
    organizationId: string,
    sliderId: string,
    input: ReorderSlidesInput,
    req: Request,
  ) {
    const slider = assertOwned(await sliderRepository.findByIdInOrg(sliderId, organizationId), organizationId);

    const slideIds = slider.slides.map((s) => s.id);
    const allPresent = input.orderedIds.every((id) => slideIds.includes(id));
    if (!allPresent || input.orderedIds.length !== slideIds.length) {
      throw ApiError.badRequest('orderedIds must contain exactly the slide ids');
    }

    await sliderRepository.updateSlideOrder(organizationId, input.orderedIds);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'slider',
      resourceId: sliderId,
      message: 'Slide order updated',
      req,
    });

    return input.orderedIds;
  },
};
