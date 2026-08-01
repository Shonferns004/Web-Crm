import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Request } from 'express';
import { config } from '../../config';
import { prisma } from '../../libs/prisma';
import { ApiError } from '../../utils/ApiError';
import { recordAudit } from '../../utils/audit';
import { buildPaginated, type Paginated } from '../../utils/pagination';
import { notificationService } from '../notification/service';
import { donationRepository, type ListParams } from './repository';
import type { CreateDonationInput } from './schema';

function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  const a = Buffer.from(expected, 'utf-8');
  const b = Buffer.from(signature, 'utf-8');
  return a.length === b.length && timingSafeEqual(a, b);
}

async function resolveOrgPayment(organizationId: string) {
  const rows = await prisma.organizationSetting.findMany({
    where: { organizationId, key: { in: ['payment.razorpayKeySecret', 'payment.receiptPrefix'] } },
  });
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = typeof row.value === 'string' ? row.value : '';
  }
  return {
    keySecret: settings['payment.razorpayKeySecret'] || config.razorpay.keySecret,
    receiptPrefix: settings['payment.receiptPrefix'] || 'RC',
  };
}

async function notifyOrgAdmins(organizationId: string, donation: { id: string; amount: number; donorName?: string | null }) {
  const websiteUsers = await prisma.organizationUser.findMany({
    where: { organizationId, isActive: true, role: { key: 'website_user' } },
    select: { userId: true },
  });
  const assignedAdmins = await prisma.organizationAssignment.findMany({
    where: { organizationId },
    select: { userId: true },
  });
  const userIds = new Set([
    ...websiteUsers.map((m) => m.userId),
    ...assignedAdmins.map((a) => a.userId),
  ]);
  for (const userId of userIds) {
    await notificationService.create({
      userId,
      organizationId,
      title: 'New donation received',
      body: `Donation of ${donation.amount} recorded${donation.donorName ? ` from ${donation.donorName}` : ''}.`,
      type: 'donation',
      link: `/donations/${donation.id}`,
    });
  }
}

export const donationService = {
  async list(params: ListParams): Promise<Paginated<unknown>> {
    const { items, total } = await donationRepository.list(params);
    return buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take);
  },

  async create(organizationId: string, input: CreateDonationInput, req: Request) {
    if (input.amount > config.donation.maxAmount) {
      throw ApiError.badRequest(`Amount exceeds the maximum allowed (${config.donation.maxAmount})`);
    }

    if (input.campaignId) {
      const campaign = await prisma.campaign.findFirst({
        where: { id: input.campaignId, organizationId },
      });
      if (!campaign) throw ApiError.notFound('Campaign not found');
    }

    const { keySecret } = await resolveOrgPayment(organizationId);

    let status = input.status ?? 'PENDING';
    if (input.orderId && input.signature && keySecret) {
      const verified = verifyRazorpaySignature(input.orderId, input.paymentId ?? '', input.signature, keySecret);
      status = verified ? 'VERIFIED' : 'PENDING_VERIFICATION';
    } else if (input.paymentId) {
      status = 'PENDING_VERIFICATION';
    }

    const donor = await donationRepository.findOrCreateDonor(
      organizationId,
      input.donor?.email ?? input.donorEmail ?? undefined,
      input.donor?.name ?? input.donorName ?? undefined,
      input.donor?.phone ?? input.donorPhone ?? undefined,
    );

    const donation = await donationRepository.create({
      organizationId,
      amount: input.amount,
      currency: input.currency,
      paymentProvider: input.paymentProvider,
      paymentId: input.paymentId ?? undefined,
      orderId: input.orderId ?? undefined,
      signature: input.signature ?? undefined,
      status,
      campaignId: input.campaignId ?? undefined,
      donorId: donor?.id,
      donorName: input.donorName ?? input.donor?.name ?? donor?.name ?? undefined,
      donorEmail: input.donorEmail ?? input.donor?.email ?? donor?.email ?? undefined,
      donorPhone: input.donorPhone ?? input.donor?.phone ?? donor?.phone ?? undefined,
      notes: input.notes ?? undefined,
      metadata: input.metadata as never,
    });

    if (donor) {
      await donationRepository.updateDonorTotals(donor.id, input.amount);
    }

    const { receiptPrefix } = await resolveOrgPayment(organizationId);
    const receiptNumber = await donationRepository.generateReceiptNumber(organizationId, receiptPrefix);
    await donationRepository.createReceipt(
      organizationId,
      donation.id,
      receiptNumber,
      input.amount,
      donor?.name ?? input.donorName ?? undefined,
    );
    await prisma.donation.update({
      where: { id: donation.id },
      data: { receiptNumber },
    });

    await notifyOrgAdmins(organizationId, {
      id: donation.id,
      amount: Number(donation.amount),
      donorName: donation.donorName ?? null,
    });
    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'donation',
      resourceId: donation.id,
      message: `Donation recorded: ${input.amount} ${input.currency} (${receiptNumber})`,
      req,
    });

    return { ...donation, receiptNumber };
  },
};
