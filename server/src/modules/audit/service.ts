import { buildPaginated, type Paginated } from '../../utils/pagination';
import { auditRepository, type ListParams } from './repository';

export const auditService = {
  async list(params: ListParams): Promise<Paginated<unknown>> {
    const { items, total } = await auditRepository.list(params);
    return buildPaginated(items, total, Math.floor(params.skip / params.take) + 1, params.take);
  },
};
