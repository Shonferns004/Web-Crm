import { z } from 'zod';

export const listAuditLogsSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    action: z.string().max(60).optional(),
    resource: z.string().max(60).optional(),
    userId: z.string().uuid().optional(),
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
  })
  .strict();
