import { z } from 'zod';

export const createMenuSchema = z
  .object({
    name: z.string().min(1).max(200),
    location: z.string().min(1).max(100),
  })
  .strict();

export const updateMenuSchema = z
  .object({
    name: z.string().min(1).max(200).optional(),
    location: z.string().min(1).max(100).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const createMenuItemSchema = z
  .object({
    label: z.string().min(1).max(200),
    url: z.string().max(500).optional().nullable(),
    entityType: z.string().max(60).optional().nullable(),
    entityId: z.string().uuid().optional().nullable(),
    parentId: z.string().uuid().optional().nullable(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export const updateMenuItemSchema = z
  .object({
    label: z.string().min(1).max(200).optional(),
    url: z.string().max(500).optional().nullable(),
    entityType: z.string().max(60).optional().nullable(),
    entityId: z.string().uuid().optional().nullable(),
    parentId: z.string().uuid().optional().nullable(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const reorderMenuItemsSchema = z
  .object({
    orderedIds: z.array(z.string().uuid()).min(1),
  })
  .strict();

export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;
export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
export type ReorderMenuItemsInput = z.infer<typeof reorderMenuItemsSchema>;
