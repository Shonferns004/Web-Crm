import { z } from 'zod';
import { PublishStatus } from '@prisma/client';

export const createPageSchema = z
  .object({
    slug: z
      .string()
      .min(1)
      .max(200)
      .regex(/^[a-z0-9][a-z0-9-_/]*$/, 'Invalid slug'),
    title: z.string().min(1).max(300),
    metaTitle: z.string().max(300).optional().nullable(),
    metaDescription: z.string().max(1000).optional().nullable(),
    status: z.nativeEnum(PublishStatus).optional(),
    template: z.string().max(100).optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isHome: z.boolean().optional(),
  })
  .strict();

export const updatePageSchema = z
  .object({
    slug: z
      .string()
      .min(1)
      .max(200)
      .regex(/^[a-z0-9][a-z0-9-_/]*$/, 'Invalid slug')
      .optional(),
    title: z.string().min(1).max(300).optional(),
    metaTitle: z.string().max(300).optional().nullable(),
    metaDescription: z.string().max(1000).optional().nullable(),
    status: z.nativeEnum(PublishStatus).optional(),
    template: z.string().max(100).optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isHome: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const createSectionSchema = z
  .object({
    type: z.string().min(1).max(100),
    name: z.string().max(300).optional().nullable(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
    settings: z.record(z.string(), z.unknown()).optional().nullable(),
    content: z.record(z.string(), z.unknown()).optional().nullable(),
  })
  .strict();

export const updateSectionSchema = z
  .object({
    type: z.string().min(1).max(100).optional(),
    name: z.string().max(300).optional().nullable(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
    settings: z.record(z.string(), z.unknown()).optional().nullable(),
    content: z.record(z.string(), z.unknown()).optional().nullable(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const reorderSectionsSchema = z
  .object({
    orderedIds: z.array(z.string().uuid()).min(1),
  })
  .strict();

export const listPagesSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    search: z.string().max(200).optional(),
    status: z.nativeEnum(PublishStatus).optional(),
    sortBy: z.string().max(60).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  })
  .strict();

export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
export type CreateSectionInput = z.infer<typeof createSectionSchema>;
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
export type ReorderSectionsInput = z.infer<typeof reorderSectionsSchema>;
