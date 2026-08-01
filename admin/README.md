# Admin Panel — Multi-Website Management

A React admin panel for managing a portfolio of websites and their login credentials. It tracks each site's URL, status, and credentials, and ships with a login flow where a user signs in with their per-website credentials and is redirected to the site they're assigned to. The interface is fully responsive and includes a dashboard with stats and charts, full CRUD management for websites, and customizable branding.

## Tech Stack

| Library | Version | Purpose |
| --- | --- | --- |
| React | `^19.2.8` | UI framework |
| React DOM | `^19.2.8` | DOM rendering for React |
| TypeScript | `~6.0.2` | Typed language / build tooling |
| Vite | `^8.2.0` | Dev server and production bundler |
| React Router | `^7.18.2` | Client-side routing |
| Axios | `^1.19.0` | HTTP client (`lib/axios.ts`) |
| lucide-react | `^1.28.0` | Icon set |
| @vitejs/plugin-react | `^6.0.4` | Vite React plugin |
| Oxlint | `^1.75.0` | Linter |

> Note: Charts on the Dashboard are hand-built SVG components (see
> `pages/Dashboard.tsx`) — no charting library is required.

## Features

- **Dashboard** — stat cards, a growth-trend area chart with a time-range dropdown (Year to Date / Last 6 Months / Last 3 Months / Last 30 Days), a status donut chart, a "Managed Websites" grid, and a summary strip.
- **Websites management** — full CRUD (add / edit / delete) behind a modal, form validation, loading skeletons, and an empty state. On mobile the table collapses into a stacked card layout.
- **Per-website credentials** — each website stores a username and password; passwords are masked with a per-row show/hide toggle.
- **Login-based redirect** — a user signs in with their assigned website's credentials and is redirected to that website's URL (`window.location.href`).
- **Responsive design** — layouts adapt across desktop, tablet, and mobile viewports with mobile navigation and touch-friendly targets.
- **Customizable branding** — the app name, logo letter, and an uploaded logo are editable from Settings and persisted to `localStorage`.

## Folder Structure

```
admin/
├── public/                     # Static public assets served as-is
├── src/
│   ├── assets/                 # Static images (svg placeholders, etc.)
│   ├── components/             # Reusable UI components (e.g. Modal)
│   ├── config/                 # App configuration: constants.ts (APP_NAME),
│   │                           #   api.ts (BASE_URL), branding.ts (branding store)
│   ├── data/                   # Mock data used until a real backend exists
│   ├── hooks/                  # Custom React hooks (e.g. useBranding)
│   ├── layouts/                # Layout wrappers: MainLayout, AuthLayout
│   ├── lib/                    # Third-party integrations (Axios client)
│   ├── pages/                  # Route-level pages: Dashboard, Websites,
│   │                           #   Settings, Login
│   ├── routes/                 # React Router route definitions
│   ├── services/               # Data-access layer (website CRUD)
│   ├── styles/                 # CSS for layouts/pages/components (auth.css,
│   │                           #   main-layout.css, pages.css, components.css)
│   ├── types/                  # Shared TypeScript types and interfaces
│   ├── utils/                  # Small helper utilities (formatDate, validation)
│   ├── App.tsx                 # Root component mounting the router
│   ├── index.css               # Global styles: CSS variables, base + shared styles
│   └── main.tsx                # App entry point
```

There is currently no `context/` folder — authentication state is local to
`pages/Login.tsx` (see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details).

## Getting Started

### Prerequisites

- **Node.js `^20.19.0` or `>=22.12.0`** (required by Vite 8)
- npm (comes with Node)

### Installation

```bash
git clone <your-repository-url>
cd admin
npm install
```

### Environment Setup

The app is configured to talk to a backend at `src/config/api.ts`:

```ts
export const BASE_URL = 'http://localhost:5000/api'
```

The service layer sends requests through an Axios client built on `BASE_URL`.
Until a real backend exists, requests are intercepted by a mock adapter (see
`src/services/websiteService.ts`) that serves local data, so the app runs fully
standalone. To point at a real backend, just change `BASE_URL`.

### Running Locally

```bash
npm run dev
```

Vite starts a dev server (default `http://localhost:5173`) with HMR.

### Building for Production

```bash
npm run build
```

Runs `tsc -b` (type-check) followed by `vite build`. Output goes to `dist/`.

### Linting

```bash
npm run lint
```

Runs `oxlint` against the codebase.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot module replacement |
| `npm run build` | Type-check with `tsc -b`, then bundle for production with Vite |
| `npm run lint` | Lint the codebase with Oxlint |
| `npm run preview` | Serve the production build locally to preview it |

## Configuration

| File | What it controls |
| --- | --- |
| `src/config/constants.ts` | `APP_NAME` — default application name (fallback branding). |
| `src/config/api.ts` | `BASE_URL` — backend API base URL used by the Axios client. |
| `src/config/branding.ts` | Branding defaults (`DEFAULT_BRANDING`) and the `localStorage` key (`admin-panel:branding`). Branding is editable in Settings → Customize Branding. |

### Changing the app name / branding

Edit `APP_NAME` in `src/config/constants.ts` to change the default fallback
name. Users can override the live app name, logo letter, and logo from the
**Settings → Customize Branding** panel; those values persist in `localStorage`
and take priority over the constants.

## Known Limitations / Roadmap

The following are intentional simplifications for this version:

- **Authentication is mock / client-side only.** The login page matches entered
  credentials against the mock website list and redirects via
  `window.location.href`. There is no server-side session or token handling.
- **Data is static / mock.** Websites live in `src/data/mockData.ts` and are
  mutated in memory only — changes are lost on refresh. There is no real
  backend integration yet.
- **Passwords are stored in plain text** in the mock data.

### Next Steps

- [ ] Connect a real backend API via `src/config/api.ts` (`BASE_URL`) and the
      service layer (`src/services/websiteService.ts`).
- [ ] Add real authentication (session/token-based) instead of client-side
      matching.
- [ ] Hash passwords and stop persisting plain-text credentials.
- [ ] Persist website data to a database so changes survive reloads.
- [ ] Move auth state into a shared context (`context/AuthContext.tsx`) once
      real auth is introduced.
