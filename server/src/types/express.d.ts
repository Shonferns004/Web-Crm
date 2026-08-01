import type { AuthUser, ActiveOrg } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      activeOrg?: ActiveOrg;
      orgIds?: string[];
      pagination?: {
        page: number;
        limit: number;
        skip: number;
        search?: string;
        sortBy: string;
        sortOrder: 'asc' | 'desc';
      };
    }
  }
}

export {};
