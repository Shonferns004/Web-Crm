import { z } from 'zod';

export const createBannerSchema = z
  .object({
    title: z.string().min(1).max(300),
    subtitle: z.string().max(1000).optional().nullable(),
    imageUrl: z.string().max(1000).optional().nullable(),
    mobileImageUrl: z.string().max(1000).optional().nullable(),
    linkUrl: z.string().max(500).optional().nullable(),
    ctaLabel: z.string().max(120).optional().nullable(),
    position: z.string().max(60).optional(),
    isActive: z.boolean().optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
  })
  .strict();

export const updateBannerSchema = createBannerSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type CreateBannerInput = z.infer<typeof createBannerSchema>;
export type UpdateBannerInput = z.infer<typeof updateBannerSchema>;
