import { useEffect, useState } from 'react'
import {
  getBranding,
  resetBranding,
  subscribeBranding,
  updateBranding,
} from '../config/branding'
import type { BrandingSettings } from '../config/branding'

/**
 * React hook exposing the current branding settings.
 *
 * Subscribes to the branding store so the component re-renders whenever
 * branding changes elsewhere (e.g. edits made on the Settings page).
 *
 * @returns An object with the current `branding`, plus `updateBranding`
 * and `resetBranding` helpers to change it.
 */
export function useBranding() {
  const [branding, setBranding] = useState<BrandingSettings>(getBranding)

  useEffect(() => subscribeBranding(() => setBranding(getBranding())), [])

  return {
    branding,
    updateBranding,
    resetBranding,
  }
}
