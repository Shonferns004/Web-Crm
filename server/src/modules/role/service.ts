import type { Request } from 'express';
import { ApiError } from '../../utils/ApiError';
import { recordAudit } from '../../utils/audit';
import { roleRepository } from './repository';
import type { CreateRoleInput, UpdateRoleInput } from './schema';

async function resolvePermissionIds(codes: string[] | undefined): Promise<string[]> {
  if (!codes || codes.length === 0) return [];
  const permissions = await roleRepository.findPermissionCodes(codes);
  const found = new Set(permissions.map((p) => p.code));
  const missing = codes.filter((code) => !found.has(code));
  if (missing.length > 0) {
    throw ApiError.badRequest(`Unknown permission codes: ${missing.join(', ')}`);
  }
  return permissions.map((p) => p.id);
}

export const roleService = {
  async listRoles() {
    return roleRepository.listRoles();
  },

  async listPermissions() {
    return roleRepository.listPermissions();
  },

  async getById(id: string) {
    const role = await roleRepository.findById(id);
    if (!role) throw ApiError.notFound('Role not found');
    return role;
  },

  async create(input: CreateRoleInput, req: Request) {
    const existing = await roleRepository.findByKey(input.key);
    if (existing) throw ApiError.conflict('Role key already exists', 'key');

    const role = await roleRepository.create({
      name: input.name,
      key: input.key,
      description: input.description ?? null,
      scope: input.scope ?? 'PLATFORM',
    });

    const permissionIds = await resolvePermissionIds(input.permissionCodes);
    await roleRepository.replacePermissions(role.id, permissionIds);

    await recordAudit({
      userId: req.user?.id,
      action: 'CREATE',
      resource: 'role',
      resourceId: role.id,
      message: `Role created: ${role.name}`,
      req,
    });

    return this.getById(role.id);
  },

  async update(id: string, input: UpdateRoleInput, req: Request) {
    const existing = await roleRepository.findById(id);
    if (!existing) throw ApiError.notFound('Role not found');
    if (existing.isSystem) throw ApiError.forbidden('Cannot modify a system role');

    const role = await roleRepository.update(id, {
      name: input.name,
      description: input.description === undefined ? undefined : input.description,
      scope: input.scope,
    });

    if (input.permissionCodes) {
      const permissionIds = await resolvePermissionIds(input.permissionCodes);
      await roleRepository.replacePermissions(role.id, permissionIds);
    }

    await recordAudit({
      userId: req.user?.id,
      action: 'UPDATE',
      resource: 'role',
      resourceId: id,
      message: `Role updated: ${role.name}`,
      req,
    });

    return this.getById(id);
  },

  async remove(id: string, req: Request) {
    const existing = await roleRepository.findById(id);
    if (!existing) throw ApiError.notFound('Role not found');
    if (existing.isSystem) throw ApiError.forbidden('Cannot delete a system role');

    await roleRepository.delete(id);

    await recordAudit({
      userId: req.user?.id,
      action: 'DELETE',
      resource: 'role',
      resourceId: id,
      message: `Role deleted: ${existing.name}`,
      req,
    });

    return true;
  },
};
