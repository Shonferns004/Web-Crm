const ACCESS_KEY = 'admin-panel:access-token'
const REFRESH_KEY = 'admin-panel:refresh-token'

/**
 * Persists the JWT pair to localStorage so the session survives reloads.
 * The refresh token is rotated by the server on every refresh.
 */
export function getAccessToken(): string | null {
  return window.localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  return window.localStorage.getItem(REFRESH_KEY)
}

export function setTokens(accessToken: string, refreshToken: string): void {
  window.localStorage.setItem(ACCESS_KEY, accessToken)
  window.localStorage.setItem(REFRESH_KEY, refreshToken)
}

export function setAccessToken(accessToken: string): void {
  window.localStorage.setItem(ACCESS_KEY, accessToken)
}

export function clearTokens(): void {
  window.localStorage.removeItem(ACCESS_KEY)
  window.localStorage.removeItem(REFRESH_KEY)
}
