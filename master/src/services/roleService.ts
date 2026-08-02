import type { Role } from '../types/role'

const STORAGE_KEY = 'master-crm.roles.v1'

const ROLES_UPDATED_EVENT = 'roles:updated'

const seedRoles = (): Role[] => {
  const now = new Date().toISOString()
  return [
    {
      id: 'role-site',
      name: 'Admin',
      description: 'Access to a single managed website',
      createdAt: now,
    },
  ]
}

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const readStored = (): Role[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedRoles()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      return seeded
    }
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Role[]) : []
  } catch {
    return seedRoles()
  }
}

export const roleService = {
  async list(): Promise<Role[]> {
    await delay(200)
    return readStored()
  },

  async create(input: { name: string; description: string }): Promise<Role> {
    await delay(450)
    const roles = readStored()
    const role: Role = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      description: input.description.trim(),
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...roles, role]))
    window.dispatchEvent(new CustomEvent(ROLES_UPDATED_EVENT))
    return role
  },

  async remove(id: string): Promise<void> {
    await delay(200)
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(readStored().filter((role) => role.id !== id)),
    )
    window.dispatchEvent(new CustomEvent(ROLES_UPDATED_EVENT))
  },
}

export { ROLES_UPDATED_EVENT }
