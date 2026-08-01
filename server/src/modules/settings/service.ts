import { recordAudit } from '../../utils/audit';
import { settingsRepository } from './repository';
import type { UpdateSettingsInput } from './schema';

export const settingsService = {
  async get(organizationId: string) {
    return settingsRepository.getAll(organizationId);
  },

  async update(organizationId: string, input: UpdateSettingsInput, userId: string) {
    const updated = await settingsRepository.upsertMany(organizationId, input.settings);

    await recordAudit({
      userId,
      organizationId,
      action: 'UPDATE',
      resource: 'settings',
      message: `Settings updated: ${updated.map((s) => s.key).join(', ')}`,
    });

    return updated.map((s) => s.key);
  },
};
