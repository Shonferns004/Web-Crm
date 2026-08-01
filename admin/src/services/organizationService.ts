import { http } from '../lib/axios'
import type {
  AssignedAdmin,
  Organization,
  OrganizationCreateResult,
  OrganizationInput,
  OrganizationMember,
  OrganizationUpdateInput,
  Paginated,
  WebUserCredential,
} from '../types'

export interface ListOrganizationsParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export async function getOrganizations(
  params: ListOrganizationsParams = {},
): Promise<Paginated<Organization>> {
  return http.get<Paginated<Organization>>('/organizations', { params })
}

export async function getOrganization(id: string): Promise<Organization> {
  return http.get<Organization>(`/organizations/${id}`)
}

export async function createOrganization(
  input: OrganizationInput,
): Promise<OrganizationCreateResult> {
  return http.post<OrganizationCreateResult>('/organizations', input)
}

export async function updateOrganization(
  id: string,
  input: OrganizationUpdateInput,
): Promise<Organization> {
  return http.patch<Organization>(`/organizations/${id}`, input)
}

export async function deleteOrganization(id: string): Promise<void> {
  await http.delete<boolean>(`/organizations/${id}`)
}

export async function getOrganizationUsers(
  id: string,
  params: { page?: number; limit?: number; search?: string } = {},
): Promise<Paginated<OrganizationMember>> {
  return http.get<Paginated<OrganizationMember>>(`/organizations/${id}/users`, {
    params,
  })
}

export async function createOrganizationUser(
  id: string,
  input: {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
  },
): Promise<{ user: OrganizationMember['user']; role: { id: string; key: string; name: string } }> {
  return http.post(`/organizations/${id}/users`, input)
}

export async function deleteOrganizationUser(
  id: string,
  userId: string,
): Promise<void> {
  await http.delete<boolean>(`/organizations/${id}/users/${userId}`)
}

export async function getAssignedAdmins(id: string): Promise<AssignedAdmin[]> {
  return http.get<AssignedAdmin[]>(`/organizations/${id}/admins`)
}

export type { WebUserCredential }
