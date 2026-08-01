import axios from 'axios'
import { BASE_URL } from '../config/api'

/**
 * Shared Axios instance for all API calls.
 *
 * Configured with the application's `BASE_URL` (see `config/api.ts`) and a
 * JSON content-type header. Every data-access module in `services/` uses this
 * client, so switching to a real backend only requires changing `BASE_URL`.
 *
 * Currently all requests run through a mock adapter (defined in
 * `services/websiteService.ts`) that resolves local data instead of hitting
 * the network.
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
