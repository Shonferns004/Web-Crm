import { z } from 'zod';
import { OrgStatus } from '@prisma/client';

export const createOrganizationSchema = z
  .object({
    name: z.string().min(2).max(200),
    slug: z
      .string()
      .min(2)
      .max(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers and hyphens')
      .optional(),
    website: z.string().url().max(500),
    email: z.string().email().max(254).optional().nullable(),
    phone: z.string().max(30).optional().nullable(),
    description: z.string().max(2000).optional().nullable(),
    address: z.string().max(1000).optional().nullable(),
    city: z.string().max(200).optional().nullable(),
    state: z.string().max(200).optional().nullable(),
    country: z.string().max(200).optional().nullable(),
    taxId: z.string().max(200).optional().nullable(),
    plan: z.string().max(60).optional(),
    /** optional override: use this email for the auto-created website user */
    adminEmail: z.string().email().max(254).optional(),
    adminFirstName: z.string().max(200).optional(),
    adminLastName: z.string().max(200).optional(),
    adminPassword: z.string().min(8).max(128).optional(),
  })
  .strict();

export const updateOrganizationSchema = z
  .object({
    name: z.string().min(2).max(200).optional(),
    email: z.string().email().max(254).optional().nullable(),
    phone: z.string().max(30).optional().nullable(),
    website: z.string().url().max(500).optional().nullable(),
    description: z.string().max(2000).optional().nullable(),
    address: z.string().max(1000).optional().nullable(),
    city: z.string().max(200).optional().nullable(),
    state: z.string().max(200).optional().nullable(),
    country: z.string().max(200).optional().nullable(),
    taxId: z.string().max(200).optional().nullable(),
    logoUrl: z.string().max(1000).optional().nullable(),
    plan: z.string().max(60).optional(),
    status: z.nativeEnum(OrgStatus).optional(),
  })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided',
    });

export const updateSettingsSchema = z
  .object({
    settings: z
      .record(z.string().min(1).max(200), z.union([z.string(), z.number(), z.boolean(), z.null()]))
      .refine((obj) => Object.keys(obj).length > 0, {
        message: 'At least one setting is required',
      }),
  })
  .strict();

export const createSiteUserSchema = z
  .object({
    email: z.string().email().max(254),
    password: z.string().min(8).max(128),
    firstName: z.string().min(1).max(200),
    lastName: z.string().max(200).optional().nullable(),
    phone: z.string().max(30).optional().nullable(),
  })
  .strict();

export const assignAdminSchema = z
  .object({
    userId: z.string().uuid(),
  })
  .strict();

export const listOrganizationsSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    search: z.string().max(200).optional(),
    sortBy: z.string().max(60).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    status: z.nativeEnum(OrgStatus).optional(),
  })
  .strict();

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type CreateSiteUserInput = z.infer<typeof createSiteUserSchema>;
export type AssignAdminInput = z.infer<typeof assignAdminSchema>;
