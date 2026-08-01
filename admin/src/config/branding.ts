import { APP_NAME } from './constants'

/**
 * Branding settings shown in the top bar and login screen.
 * Customizable from the Settings page and persisted to `localStorage`
 * under the `admin-panel:branding` key.
 */
export interface BrandingSettings {
  /** Application name displayed next to the logo. */
  appName: string
  /** Single-letter fallback shown in the logo when no `logoUrl` is set. */
  logoLetter: string
  /** Optional uploaded logo image (data URL). Empty string means "no logo". */
  logoUrl: string
}

/** Default branding used before any customization is saved. */
export const DEFAULT_BRANDING: BrandingSettings = {
  appName: APP_NAME,
  logoLetter: 'A',
  logoUrl: '',
}

/** localStorage key where branding settings are persisted. */
const STORAGE_KEY = 'admin-panel:branding'

type Listener = () => void

const listeners = new Set<Listener>()

/**
 * Reads persisted branding from localStorage, falling back to defaults when
 * nothing is stored or the stored value is malformed.
 */
function loadBranding(): BrandingSettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<BrandingSettings>
      return {
        ...DEFAULT_BRANDING,
        ...(typeof parsed.appName === 'string' ? { appName: parsed.appName } : {}),
        ...(typeof parsed.logoLetter === 'string'
          ? { logoLetter: parsed.logoLetter }
          : {}),
        ...(typeof parsed.logoUrl === 'string' ? { logoUrl: parsed.logoUrl } : {}),
      }
    }
  } catch {
    // ignore malformed storage
  }
  return DEFAULT_BRANDING
}

let current = loadBranding()

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // storage unavailable; keep in-memory value
  }
  listeners.forEach((listener) => listener())
}

/** Returns the current in-memory branding settings. */
export function getBranding(): BrandingSettings {
  return current
}

/**
 * Applies a partial update to the branding settings, persists them, and
 * notifies all subscribers so open components re-render immediately.
 *
 * @param patch - Only the fields to change.
 * @returns The updated branding settings.
 */
export function updateBranding(
  patch: Partial<BrandingSettings>,
): BrandingSettings {
  current = { ...current, ...patch }
  persist()
  return current
}

/**
 * Restores branding to `DEFAULT_BRANDING`, clears the stored value, and
 * notifies subscribers.
 *
 * @returns The reset branding settings.
 */
export function resetBranding(): BrandingSettings {
  current = { ...DEFAULT_BRANDING }
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // storage unavailable
  }
  listeners.forEach((listener) => listener())
  return current
}

/**
 * Subscribes a listener to branding changes (used by the `useBranding` hook).
 *
 * @param listener - Callback invoked whenever branding changes.
 * @returns An unsubscribe function.
 */
export function subscribeBranding(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
