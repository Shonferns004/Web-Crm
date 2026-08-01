import { z } from 'zod';

export const updateSettingsSchema = z
  .object({
    settings: z
      .record(
        z.string().min(1).max(200),
        z.union([z.string(), z.number(), z.boolean(), z.null()]),
      )
      .refine((obj) => Object.keys(obj).length > 0, {
        message: 'At least one setting is required',
      }),
  })
  .strict();

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
