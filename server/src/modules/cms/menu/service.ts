import type { Request } from 'express';
import { prisma } from '../../../libs/prisma';
import { ApiError } from '../../../utils/ApiError';
import { recordAudit } from '../../../utils/audit';
import { menuRepository } from './repository';
import type {
  CreateMenuItemInput,
  CreateMenuInput,
  ReorderMenuItemsInput,
  UpdateMenuItemInput,
  UpdateMenuInput,
} from './schema';

export const menuService = {
  async list(organizationId: string) {
    return menuRepository.list(organizationId);
  },

  async getById(organizationId: string, id: string) {
    const menu = await menuRepository.findByIdInOrg(id, organizationId);
    if (!menu) throw ApiError.notFound('Menu not found');
    return menu;
  },

  async create(organizationId: string, input: CreateMenuInput, req: Request) {
    const conflict = await menuRepository.findByLocation(input.location, organizationId);
    if (conflict) {
      throw ApiError.conflict('A menu with this location already exists', 'location');
    }

    const menu = await menuRepository.create(organizationId, input);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'menu',
      resourceId: menu.id,
      message: `Menu created: ${menu.name}`,
      req,
    });

    return menu;
  },

  async update(organizationId: string, id: string, input: UpdateMenuInput, req: Request) {
    const existing = await menuRepository.findById(id);
    if (!existing || existing.organizationId !== organizationId) {
      throw ApiError.notFound('Menu not found');
    }

    if (input.location) {
      const conflict = await menuRepository.findByLocation(input.location, organizationId);
      if (conflict && conflict.id !== id) {
        throw ApiError.conflict('A menu with this location already exists', 'location');
      }
    }

    const menu = await menuRepository.update(id, { ...input });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'menu',
      resourceId: id,
      message: `Menu updated: ${menu.name}`,
      req,
    });

    return menu;
  },

  async remove(organizationId: string, id: string, req: Request) {
    const existing = await menuRepository.findById(id);
    if (!existing || existing.organizationId !== organizationId) {
      throw ApiError.notFound('Menu not found');
    }

    await menuRepository.delete(id);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'DELETE',
      resource: 'menu',
      resourceId: id,
      message: `Menu deleted: ${existing.name}`,
      req,
    });

    return true;
  },

  async addItem(organizationId: string, menuId: string, input: CreateMenuItemInput, req: Request) {
    const menu = await menuRepository.findById(menuId);
    if (!menu || menu.organizationId !== organizationId) {
      throw ApiError.notFound('Menu not found');
    }

    const item = await menuRepository.createItem(organizationId, menuId, {
      label: input.label,
      url: input.url ?? null,
      entityType: input.entityType ?? null,
      entityId: input.entityId ?? null,
      parentId: input.parentId ?? null,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
    });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'CREATE',
      resource: 'menu',
      resourceId: menuId,
      message: `Menu item added: ${item.label}`,
      req,
    });

    return item;
  },

  async updateItem(
    organizationId: string,
    menuId: string,
    itemId: string,
    input: UpdateMenuItemInput,
    req: Request,
  ) {
    const menu = await menuRepository.findById(menuId);
    if (!menu || menu.organizationId !== organizationId) {
      throw ApiError.notFound('Menu not found');
    }

    const existing = await menuRepository.findItemInOrg(itemId, organizationId);
    if (!existing) throw ApiError.notFound('Menu item not found');

    const item = await menuRepository.updateItem(itemId, { ...input });

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'menu',
      resourceId: menuId,
      message: `Menu item updated: ${item.label}`,
      req,
    });

    return item;
  },

  async removeItem(organizationId: string, menuId: string, itemId: string, req: Request) {
    const menu = await menuRepository.findById(menuId);
    if (!menu || menu.organizationId !== organizationId) {
      throw ApiError.notFound('Menu not found');
    }

    const existing = await menuRepository.findItemInOrg(itemId, organizationId);
    if (!existing) throw ApiError.notFound('Menu item not found');

    await menuRepository.deleteItem(itemId);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'DELETE',
      resource: 'menu',
      resourceId: menuId,
      message: `Menu item deleted: ${existing.label}`,
      req,
    });

    return true;
  },

  async reorderItems(
    organizationId: string,
    menuId: string,
    input: ReorderMenuItemsInput,
    req: Request,
  ) {
    const menu = await menuRepository.findById(menuId);
    if (!menu || menu.organizationId !== organizationId) {
      throw ApiError.notFound('Menu not found');
    }

    const items = (await prisma.menuItem.findMany({ where: { menuId }, select: { id: true } })).map((r) => r.id);
    const allPresent = input.orderedIds.every((id) => items.includes(id));
    if (!allPresent || input.orderedIds.length !== items.length) {
      throw ApiError.badRequest('orderedIds must contain exactly the menu item ids');
    }

    await menuRepository.updateItemOrder(organizationId, input.orderedIds);

    await recordAudit({
      userId: req.user?.id,
      organizationId,
      action: 'UPDATE',
      resource: 'menu',
      resourceId: menuId,
      message: 'Menu item order updated',
      req,
    });

    return input.orderedIds;
  },
};
