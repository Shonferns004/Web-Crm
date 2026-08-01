import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email().max(254),
    password: z.string().min(8).max(128),
    firstName: z.string().min(1).max(200),
    lastName: z.string().max(200).optional().nullable(),
    phone: z.string().max(30).optional().nullable(),
    avatarUrl: z.string().max(1000).optional().nullable(),
    isActive: z.boolean().optional(),
    /** assign a platform role (admins). Master only. */
    role: z.enum(['admins']).optional(),
  })
  .strict();

export const updateUserSchema = z
  .object({
    email: z.string().email().max(254).optional(),
    password: z.string().min(8).max(128).optional(),
    firstName: z.string().min(1).max(200).optional(),
    lastName: z.string().max(200).optional().nullable(),
    phone: z.string().max(30).optional().nullable(),
    avatarUrl: z.string().max(1000).optional().nullable(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const assignOrgSchema = z
  .object({
    organizationId: z.string().uuid(),
    roleId: z.string().uuid(),
    isCurrent: z.boolean().optional(),
  })
  .strict();

export const listUsersSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    search: z.string().max(200).optional(),
    sortBy: z.string().max(60).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    organizationId: z.string().uuid().optional(),
  })
  .strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type AssignOrgInput = z.infer<typeof assignOrgSchema>;
