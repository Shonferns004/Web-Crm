// =============================================
// Minimal fetch wrapper – backend ready hone par use hoga.
// Abhi ke liye sirf static data fallback ke saath.
// =============================================
import { API_URL } from "../config";

export async function getJSON(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
