import { apiClient } from '../lib/axios'
import type { Website } from '../types'
import { MOCK_WEBSITES } from '../data/mockData'

/**
 * Payload used to create or update a website.
 * The `id` and `status` fields are omitted because the service layer
 * assigns/manages them (a new record is always created as `active`).
 */
export type WebsiteInput = Pick<
  Website,
  'name' | 'url' | 'username' | 'password'
>

/** HTTP methods accepted by the mock request adapter. */
type HttpMethod = 'get' | 'post' | 'put' | 'delete'

/** Simulated network latency (ms) applied to every mock request. */
const LATENCY_MS = 600

/**
 * Performs a fake HTTP request through the shared Axios client.
 *
 * Instead of hitting a real server, the request uses a custom Axios adapter
 * that resolves `mockData` after a short delay. This lets the rest of the app
 * consume promise-based data through `apiClient` so a real backend can be
 * dropped in later without changing the call sites.
 *
 * @param mockData - The data to resolve as the response body.
 * @param url - The endpoint path (e.g. `/websites`).
 * @param method - The HTTP method to simulate.
 * @returns A promise that resolves with `mockData`.
 */
function mockRequest<T>(mockData: T, url: string, method: HttpMethod): Promise<T> {
  return apiClient
    .request<T>({
      url,
      method,
      adapter: (config) =>
        new Promise((resolve) => {
          window.setTimeout(() => {
            resolve({
              data: mockData,
              status: 200,
              statusText: 'OK',
              headers: config.headers,
              config,
            })
          }, LATENCY_MS)
        }),
    })
    .then((response) => response.data)
}

/**
 * Fetches all managed websites.
 * Returns a shallow copy of the mock store so callers can't mutate it directly.
 *
 * @returns A promise resolving to the list of websites.
 */
export function getWebsites(): Promise<Website[]> {
  return mockRequest([...MOCK_WEBSITES], '/websites', 'get')
}

/**
 * Creates a new website from the supplied input.
 * The new record is assigned a random id and an `active` status, then pushed
 * into the in-memory mock store.
 *
 * @param input - The website fields to create (`name`, `url`, `username`, `password`).
 * @returns A promise resolving to the created website.
 */
export function addWebsite(input: WebsiteInput): Promise<Website> {
  const record: Website = { id: crypto.randomUUID(), ...input, status: 'active' }
  MOCK_WEBSITES.push(record)
  return mockRequest(record, '/websites', 'post')
}

/**
 * Updates an existing website in the mock store.
 * Only the fields in `input` are overwritten; the record's `status` is preserved.
 *
 * @param id - The id of the website to update.
 * @param input - The updated website fields.
 * @returns A promise resolving to the updated website.
 */
export function updateWebsite(
  id: string,
  input: WebsiteInput,
): Promise<Website> {
  const index = MOCK_WEBSITES.findIndex((website) => website.id === id)
  const existing = index >= 0 ? MOCK_WEBSITES[index] : undefined
  const updated: Website = {
    id,
    ...existing,
    ...input,
    status: existing?.status ?? 'active',
  }
  if (existing) {
    MOCK_WEBSITES[index] = updated
  }
  return mockRequest(updated, `/websites/${id}`, 'put')
}

/**
 * Removes a website from the mock store by its id.
 *
 * @param id - The id of the website to delete.
 * @returns A promise that resolves once the mock request completes.
 */
export function deleteWebsite(id: string): Promise<void> {
  const index = MOCK_WEBSITES.findIndex((website) => website.id === id)
  if (index >= 0) {
    MOCK_WEBSITES.splice(index, 1)
  }
  return mockRequest(undefined, `/websites/${id}`, 'delete')
}
