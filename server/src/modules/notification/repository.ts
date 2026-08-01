import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

export interface ListParams {
  userId: string;
  skip: number;
  take: number;
  unreadOnly?: boolean;
}

export interface CreateNotificationInput {
  userId: string;
  organizationId?: string;
  title: string;
  body?: string;
  type?: string;
  link?: string;
}

export const notificationRepository = {
  async list(params: ListParams) {
    const where: Prisma.NotificationWhereInput = {
      userId: params.userId,
      ...(params.unreadOnly ? { isRead: false } : {}),
    };

    const [items, total, unread] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: [{ isRead: 'asc' }, { createdAt: 'desc' }],
        skip: params.skip,
        take: params.take,
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { userId: params.userId, isRead: false } }),
    ]);

    return { items, total, unread };
  },

  async create(input: CreateNotificationInput) {
    return prisma.notification.create({
      data: {
        userId: input.userId,
        organizationId: input.organizationId ?? null,
        title: input.title,
        body: input.body ?? null,
        type: input.type ?? 'info',
        link: input.link ?? null,
      },
    });
  },

  async markRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true },
    });
  },

  async markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  },
};
