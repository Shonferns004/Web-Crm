import { z } from 'zod';

export const createSliderSchema = z
  .object({
    name: z.string().min(1).max(200),
    isActive: z.boolean().optional(),
  })
  .strict();

export const updateSliderSchema = z
  .object({
    name: z.string().min(1).max(200).optional(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const createSlideSchema = z
  .object({
    title: z.string().min(1).max(300),
    subtitle: z.string().max(1000).optional().nullable(),
    imageUrl: z.string().min(1).max(1000),
    mobileImageUrl: z.string().max(1000).optional().nullable(),
    ctaLabel: z.string().max(120).optional().nullable(),
    ctaUrl: z.string().max(500).optional().nullable(),
    altText: z.string().max(300).optional().nullable(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export const updateSlideSchema = createSlideSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const reorderSlidesSchema = z
  .object({
    orderedIds: z.array(z.string().uuid()).min(1),
  })
  .strict();

export type CreateSliderInput = z.infer<typeof createSliderSchema>;
export type UpdateSliderInput = z.infer<typeof updateSliderSchema>;
export type CreateSlideInput = z.infer<typeof createSlideSchema>;
export type UpdateSlideInput = z.infer<typeof updateSlideSchema>;
export type ReorderSlidesInput = z.infer<typeof reorderSlidesSchema>;
