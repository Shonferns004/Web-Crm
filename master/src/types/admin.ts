export type AdminStatus = 'active' | 'disabled'

export type AdminRole = 'master' | 'site'

export interface AdminUser {
  id: string
  username: string
  password: string
  role: AdminRole
  status: AdminStatus
  createdAt: string
  createdBy: string
  lastLoginAt: string | null
}

export interface CreateAdminInput {
  username: string
  password: string
  role: AdminRole
}
