import { z } from 'zod';
import { sectionFieldsSchema } from '../../../utils/sectionFields';

export const createSectionTemplateSchema = z
  .object({
    type: z
      .string()
      .min(1)
      .max(100)
      .regex(/^[a-z0-9][a-z0-9-_]*$/, 'Invalid type (lowercase letters, numbers, dashes)'),
    name: z.string().min(1).max(200),
    label: z.string().min(1).max(200),
    description: z.string().max(1000).optional().nullable(),
    fields: sectionFieldsSchema,
  })
  .strict();

export const updateSectionTemplateSchema = z
  .object({
    type: z
      .string()
      .min(1)
      .max(100)
      .regex(/^[a-z0-9][a-z0-9-_]*$/, 'Invalid type (lowercase letters, numbers, dashes)')
      .optional(),
    name: z.string().min(1).max(200).optional(),
    label: z.string().min(1).max(200).optional(),
    description: z.string().max(1000).optional().nullable(),
    fields: sectionFieldsSchema.optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type CreateSectionTemplateInput = z.infer<typeof createSectionTemplateSchema>;
export type UpdateSectionTemplateInput = z.infer<typeof updateSectionTemplateSchema>;
