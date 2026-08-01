import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

export const supabase: SupabaseClient | null = hasSupabaseConfig()
  ? createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: { persistSession: false },
    })
  : null;

function hasSupabaseConfig(): boolean {
  const key = config.supabase.serviceRoleKey;
  return (
    config.supabase.url.startsWith('http') &&
    key.length > 0 &&
    key !== 'your-service-role-key' &&
    !key.includes('YOUR-PROJECT')
  );
}

export function storageReady(): boolean {
  return supabase !== null;
}
