// =============================================
// Environment config
// VITE_API_URL set karne par frontend backend se data fetch karega.
// Empty rahega to static/mock data use hota hai.
// =============================================
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const isApiMode = Boolean(API_URL);
export { API_URL };

export const API_ENDPOINTS = {
  site: `${API_URL}/api/site`,
  projects: `${API_URL}/api/projects`,
  project: (slug) => `${API_URL}/api/projects/${slug}`,
  gallery: `${API_URL}/api/gallery`,
  team: `${API_URL}/api/team`,
};
