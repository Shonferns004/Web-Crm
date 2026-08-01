import { z } from 'zod';

const money = z.coerce.number().positive().multipleOf(0.01);

export const createDonationSchema = z
  .object({
    amount: money,
    currency: z.string().length(3).default('INR'),
    paymentProvider: z.enum(['razorpay', 'paypal', 'manual', 'cash', 'other']).default('razorpay'),
    paymentId: z.string().max(200).optional().nullable(),
    orderId: z.string().max(200).optional().nullable(),
    signature: z.string().max(500).optional().nullable(),
    status: z.enum(['PENDING', 'PENDING_VERIFICATION', 'VERIFIED', 'FAILED']).optional(),
    campaignId: z.string().uuid().optional().nullable(),
    donor: z
      .object({
        name: z.string().max(300).optional().nullable(),
        email: z.string().email().max(254).optional().nullable(),
        phone: z.string().max(30).optional().nullable(),
        panNumber: z.string().max(30).optional().nullable(),
      })
      .optional()
      .nullable(),
    donorName: z.string().max(300).optional().nullable(),
    donorEmail: z.string().email().max(254).optional().nullable(),
    donorPhone: z.string().max(30).optional().nullable(),
    notes: z.string().max(2000).optional().nullable(),
    metadata: z.record(z.string(), z.unknown()).optional().nullable(),
  })
  .strict();

export const listDonationsSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    status: z.string().max(60).optional(),
    campaignId: z.string().uuid().optional(),
    donorId: z.string().uuid().optional(),
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
    search: z.string().max(200).optional(),
    sortBy: z.string().max(60).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  })
  .strict();

export type CreateDonationInput = z.infer<typeof createDonationSchema>;
