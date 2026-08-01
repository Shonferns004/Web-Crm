import { z } from 'zod';
import { RoleScope } from '@prisma/client';

export const createRoleSchema = z
  .object({
    name: z.string().min(2).max(200),
    key: z
      .string()
      .min(2)
      .max(100)
      .regex(/^[a-z0-9_]+$/, 'Key must be lowercase letters, numbers and underscores'),
    description: z.string().max(500).optional().nullable(),
    scope: z.nativeEnum(RoleScope).optional(),
    permissionCodes: z.array(z.string().max(200)).max(500).optional(),
  })
  .strict();

export const updateRoleSchema = z
  .object({
    name: z.string().min(2).max(200).optional(),
    description: z.string().max(500).optional().nullable(),
    scope: z.nativeEnum(RoleScope).optional(),
    permissionCodes: z.array(z.string().max(200)).max(500).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
