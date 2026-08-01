import type { Prisma } from '@prisma/client';

export interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
}

export function getPagination(query: Record<string, unknown>): PaginationResult {
  const rawPage = Number(query.page);
  const rawLimit = Number(query.limit);

  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit =
    Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 20;

  return { page, limit, skip: (page - 1) * limit };
}

export function buildWhereSearch(
  search: string | undefined,
  fields: string[],
): Prisma.StringFilter | undefined {
  if (!search) return undefined;
  const or: Prisma.StringFilter[] = fields.map((field) => ({
    [field]: { contains: search, mode: 'insensitive' },
  })) as unknown as Prisma.StringFilter[];
  return { OR: or } as unknown as Prisma.StringFilter;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function buildPaginated<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): Paginated<T> {
  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
