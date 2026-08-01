import { ApiError } from '../../utils/ApiError';
import { buildPaginated, type Paginated } from '../../utils/pagination';
import { notificationRepository, type CreateNotificationInput, type ListParams } from './repository';

export const notificationService = {
  async list(params: ListParams): Promise<Paginated<unknown> & { unread: number }> {
    const { items, total, unread } = await notificationRepository.list(params);
    return {
      ...buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take),
      unread,
    };
  },

  async create(input: CreateNotificationInput) {
    return notificationRepository.create(input);
  },

  async markRead(id: string, userId: string) {
    const result = await notificationRepository.markRead(id, userId);
    if (result.count === 0) throw ApiError.notFound('Notification not found');
    return true;
  },

  async markAllRead(userId: string) {
    return notificationRepository.markAllRead(userId);
  },
};
