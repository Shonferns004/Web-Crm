// =============================================
// useSiteData – sab pages ka data yahan se aata hai.
// Backend off hai to static data (src/data) use hota hai.
// Backend on hai (VITE_API_URL set) to API se fetch hota hai.
// =============================================
import { useEffect, useState } from "react";
import { isApiMode, API_ENDPOINTS } from "../config";
import { getJSON } from "./client";
import { slides, stats, initiatives, activities, getInvolved, causes, partners, contact } from "../data/site";
import { projects, gallerySections, team, homeProjects } from "../data/projects";

const staticData = {
  slides, stats, initiatives, activities, getInvolved, causes, partners, contact,
  projects, gallerySections, team, homeProjects,
};

export function useSiteData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(isApiMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isApiMode) {
      setData(staticData);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [site, projectsData, gallery, teamData] = await Promise.all([
          getJSON(API_ENDPOINTS.site).catch(() => ({})),
          getJSON(API_ENDPOINTS.projects).catch(() => []),
          getJSON(API_ENDPOINTS.gallery).catch(() => []),
          getJSON(API_ENDPOINTS.team).catch(() => []),
        ]);
        if (cancelled) return;
        setData({ ...staticData, ...site, projects: projectsData, gallerySections: gallery, team: teamData });
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { data: data || staticData, loading, error };
}
