import { z } from 'zod';

export const listNotificationsSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    unreadOnly: z.coerce.boolean().optional(),
  })
  .strict();
