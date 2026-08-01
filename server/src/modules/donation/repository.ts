import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

export interface ListParams {
  organizationId: string;
  skip: number;
  take: number;
  search?: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  status?: string;
  campaignId?: string;
  donorId?: string;
  from?: Date;
  to?: Date;
}

export interface CreateDonationInput {
  organizationId: string;
  amount: number;
  currency: string;
  paymentProvider: string;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  status: string;
  campaignId?: string;
  donorId?: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  notes?: string;
  metadata?: Prisma.InputJsonValue;
}

export const donationRepository = {
  async list(params: ListParams) {
    const where: Prisma.DonationWhereInput = {
      organizationId: params.organizationId,
      ...(params.status ? { status: params.status } : {}),
      ...(params.campaignId ? { campaignId: params.campaignId } : {}),
      ...(params.donorId ? { donorId: params.donorId } : {}),
      ...(params.search
        ? {
            OR: [
              { donorName: { contains: params.search, mode: 'insensitive' } },
              { donorEmail: { contains: params.search, mode: 'insensitive' } },
              { paymentId: { contains: params.search, mode: 'insensitive' } },
              { receiptNumber: { contains: params.search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(params.from || params.to
        ? {
            createdAt: {
              ...(params.from ? { gte: params.from } : {}),
              ...(params.to ? { lte: params.to } : {}),
            },
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: params.skip,
        take: params.take,
        include: {
          donor: { select: { id: true, name: true, email: true, phone: true } },
          campaign: { select: { id: true, title: true, slug: true } },
        },
      }),
      prisma.donation.count({ where }),
    ]);

    return { items, total };
  },

  async findById(id: string) {
    return prisma.donation.findUnique({ where: { id } });
  },

  async create(input: CreateDonationInput) {
    return prisma.donation.create({
      data: {
        organizationId: input.organizationId,
        amount: input.amount,
        currency: input.currency,
        paymentProvider: input.paymentProvider,
        paymentId: input.paymentId ?? null,
        orderId: input.orderId ?? null,
        signature: input.signature ?? null,
        status: input.status,
        campaignId: input.campaignId ?? null,
        donorId: input.donorId ?? null,
        donorName: input.donorName ?? null,
        donorEmail: input.donorEmail ?? null,
        donorPhone: input.donorPhone ?? null,
        notes: input.notes ?? null,
        metadata: input.metadata ?? Prisma.JsonNull,
      },
    });
  },

  async generateReceiptNumber(organizationId: string, prefix: string): Promise<string> {
    const year = new Date().getFullYear();
    const count = await prisma.receipt.count({
      where: { organizationId, receiptNumber: { startsWith: `${prefix}-${year}-` } },
    });
    return `${prefix}-${year}-${String(count + 1).padStart(5, '0')}`;
  },

  async findOrCreateDonor(organizationId: string, email?: string, name?: string, phone?: string) {
    if (!email && !phone) return null;

    const existing = email
      ? await prisma.donor.findFirst({ where: { organizationId, email } })
      : await prisma.donor.findFirst({ where: { organizationId, phone } });

    if (existing) return existing;

    return prisma.donor.create({
      data: { organizationId, email: email ?? null, name: name ?? null, phone: phone ?? null },
    });
  },

  async updateDonorTotals(donorId: string, amount: number) {
    return prisma.donor.update({
      where: { id: donorId },
      data: {
        totalDonated: { increment: amount },
        donationCount: { increment: 1 },
        lastDonationAt: new Date(),
      },
    });
  },

  async createReceipt(organizationId: string, donationId: string, receiptNumber: string, amount: number, issuedTo?: string) {
    return prisma.receipt.create({
      data: { organizationId, donationId, receiptNumber, amount, issuedTo: issuedTo ?? null },
    });
  },
};
