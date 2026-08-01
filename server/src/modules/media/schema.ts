import { z } from 'zod';

export const listMediaSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    entityType: z.string().max(60).optional(),
    entityId: z.string().uuid().optional(),
    mimeType: z.string().max(120).optional(),
  })
  .strict();

export const uploadMetadataSchema = z
  .object({
    entityType: z.string().max(60).optional().nullable(),
    entityId: z.string().uuid().optional().nullable(),
  })
  .strict();
