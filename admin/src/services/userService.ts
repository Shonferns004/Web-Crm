import { http } from '../lib/axios'
import type { ProfileUpdateInput, UserRecord } from '../types'

export async function updateProfile(
  id: string,
  input: ProfileUpdateInput,
): Promise<UserRecord> {
  return http.patch<UserRecord>(`/users/${id}`, input)
}
