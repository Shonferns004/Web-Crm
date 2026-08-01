# Architecture Overview

This document describes how the admin panel is structured and how the main
flows work end-to-end. It focuses on routing, the login/redirect flow, and the
data layer.

## Routing

Routing is defined in `src/routes/index.tsx` using React Router's
`createBrowserRouter`.

| Route | Layout | Page component |
| --- | --- | --- |
| `/login` | `AuthLayout` | `Login` |
| `/` | `MainLayout` | `Dashboard` |
| `/websites` | `MainLayout` | `Websites` |
| `/settings` | `MainLayout` | `Settings` |

- `AuthLayout` renders the centered auth card (logo, app name, sign-in form)
  used only by the login page.
- `MainLayout` renders the shared chrome — top navigation bar (brand, nav
  links, search, notifications, profile menu) plus an `<Outlet />` where each
  child page is rendered. Because the non-login routes are nested under it, the
  layout mounts once and persists across page changes.
- The root `App` component (`src/App.tsx`) simply renders `<RouterProvider>`.

## Login → Redirect Flow

Authentication is intentionally mock and client-side only. The full flow lives
in `src/pages/Login.tsx`:

1. The user submits the sign-in form with a username and password.
2. `Login` searches the mock website list (`src/data/mockData.ts`) for a
   `Website` whose `username` matches (case-insensitive) and whose `password`
   matches exactly:

   ```ts
   const website = MOCK_WEBSITES.find(
     (candidate) =>
       candidate.username.toLowerCase() === username.trim().toLowerCase() &&
       candidate.password === password,
   )
   ```

3. If no match is found, an inline error ("Invalid username or password.") is
   shown and nothing else happens.
4. On a match, the browser is redirected to the assigned website's URL:

   ```ts
   window.location.href = website.url
   ```

There is no session, token, or auth context. A user is simply "verified" by
matching credentials against the mock data, then bounced to the site they're
assigned to.

> **Note:** There is intentionally no `context/AuthContext.tsx` yet. Real
> authentication (session/token, protected routes) would naturally introduce
> one; see the Roadmap in the README.

## Data Layer & Mock Requests

All website data flows through `src/services/websiteService.ts`, which wraps
the shared Axios client from `src/lib/axios.ts`.

### Current mock flow

1. `apiClient` is created in `src/lib/axios.ts` with `BASE_URL` from
   `src/config/api.ts` (default `http://localhost:5000/api`).
2. Each service function (`getWebsites`, `addWebsite`, `updateWebsite`,
   `deleteWebsite`) calls a private `mockRequest` helper. That helper issues a
   real Axios request (`apiClient.request({ url, method, adapter })`) but
   supplies a **custom adapter** that, instead of hitting the network, resolves
   the provided mock data after a ~600 ms delay.
3. The mock source of truth is `MOCK_WEBSITES` in `src/data/mockData.ts`. It is
   seeded with three sample websites and is mutated in memory (pushed to /
   spliced from) by the service functions, so CRUD works within a session.
4. Pages (`Websites.tsx`, `Dashboard.tsx`, `Login.tsx`) consume these promise-
   based functions and never touch the mock array directly.

```
Pages ──► services/websiteService.ts ──► lib/axios.ts (apiClient)
              │                                 │
              │  mockRequest (custom adapter)   │  baseURL = config/api.ts
              ▼                                 ▼
        data/mockData.ts (MOCK_WEBSITES)   (real network — unused today)
```

### Where a real API would slot in

Because every page already talks to `websiteService` through promises, wiring a
real backend requires **no changes to the pages**:

1. Point `BASE_URL` in `src/config/api.ts` at the real server.
2. Replace the bodies of the exported service functions with real HTTP calls,
   e.g.:

   ```ts
   export function getWebsites(): Promise<Website[]> {
     return apiClient.get('/websites').then((response) => response.data)
   }
   ```

3. Remove the `mockRequest` helper and the `MOCK_WEBSITES` dependency once the
   backend handles persistence. The `Website`/`WebsiteInput` types in
   `src/types/index.ts` already match a REST-style resource.

The login flow can follow the same pattern: introduce a `POST /auth/login`
endpoint that returns a token/session, and replace the client-side matching in
`Login.tsx`.
