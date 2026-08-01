import { http } from '../lib/axios'
import type { DashboardOverview, Organization, SiteStats } from '../types'

export async function getOverview(): Promise<DashboardOverview> {
  return http.get<DashboardOverview>('/dashboard/overview')
}

export async function getWebsites(): Promise<Organization[]> {
  return http.get<Organization[]>('/dashboard/websites')
}

export async function getSiteStats(id: string): Promise<SiteStats> {
  return http.get<SiteStats>(`/dashboard/websites/${id}`)
}
