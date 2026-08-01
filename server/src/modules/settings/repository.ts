import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

export const settingsRepository = {
  async getAll(organizationId: string): Promise<Record<string, unknown>> {
    const rows = await prisma.organizationSetting.findMany({
      where: { organizationId },
      orderBy: { key: 'asc' },
    });
    const settings: Record<string, unknown> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    return settings;
  },

  async upsertMany(organizationId: string, entries: Record<string, unknown>) {
    const results = [];
    for (const [key, value] of Object.entries(entries)) {
      results.push(
        await prisma.organizationSetting.upsert({
          where: { organizationId_key: { organizationId, key } },
          update: { value: value as Prisma.InputJsonValue },
          create: { organizationId, key, value: value as Prisma.InputJsonValue },
        }),
      );
    }
    return results;
  },
};
