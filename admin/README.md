# Admin Panel — Platform Administration

A React admin panel for platform administrators. It connects to the WebCRM
backend (`server/`) and lets admins log in with real credentials, view
dashboard metrics, create/manage websites (organizations), manage website
users per site, and edit their own profile and password.

## Tech Stack

| Library | Version | Purpose |
| --- | --- | --- |
| React | `^19.2.8` | UI framework |
| TypeScript | `~6.0.2` | Typed language / build tooling |
| Vite | `^8.2.0` | Dev server and production bundler |
| React Router | `^7.18.2` | Client-side routing |
| Axios | `^1.19.0` | HTTP client (`lib/axios.ts`) |
| lucide-react | `^1.28.0` | Icon set |
| @vitejs/plugin-react | `^6.0.4` | Vite React plugin |
| Oxlint | `^1.75.0` | Linter |

> Charts on the Dashboard are hand-built SVG components (see
> `pages/Dashboard.tsx`) — no charting library is required. The growth chart
> is illustrative sample data (the API does not expose time-series yet).

## Features

- **Authentication** — real email/password login against `POST /auth/login`.
  Tokens are stored in `localStorage`; a silent refresh (`POST /auth/refresh`)
  keeps sessions alive and the user is redirected to `/login` when refresh
  fails. Protected routes are gated by `RequireAuth`.
- **Dashboard** — stat cards, website grid, and summary strip driven by
  `GET /dashboard/overview` and `GET /dashboard/websites`, plus status donut
  and sample growth charts.
- **Websites management** — create/edit websites (`POST/PATCH /organizations`),
  list via `GET /organizations`, and delete (master only, the API forbids
  platform admins from deleting organizations).
- **One-time credentials** — creating a website returns the auto-generated
  website-user credential (`webUser.email` + password) exactly once; the panel
  shows it in a copy-friendly dialog.
- **Website detail** — per-site stats (`GET /dashboard/websites/:id`), website
  users (`GET/POST/DELETE /organizations/:id/users`), and assigned platform
  admins (`GET /organizations/:id/admins`, master only).
- **Settings** — edit your profile (`PATCH /users/:id`), change your password
  (`POST /auth/change-password`), and customize panel branding (local).

## Folder Structure

```
admin/
├── public/                     # Static public assets served as-is
├── src/
│   ├── components/             # Reusable UI components (Modal, RequireAuth)
│   ├── config/                 # api.ts (BASE_URL), constants, branding store
│   ├── context/                # AuthContext (session state)
│   ├── hooks/                  # Custom React hooks (useBranding)
│   ├── layouts/                # MainLayout, AuthLayout
│   ├── lib/                    # Axios client + interceptors, token storage
│   ├── pages/                  # Login, Dashboard, Websites, WebsiteDetail, Settings
│   ├── routes/                 # React Router route definitions
│   ├── services/               # Data-access layer (auth, organization, dashboard, user)
│   ├── styles/                 # CSS for layouts/pages/components
│   ├── types/                  # Shared TypeScript types (server payload shapes)
│   ├── utils/                  # Small helper utilities
│   ├── App.tsx                 # Root component (AuthProvider + router)
│   ├── index.css               # Global styles: CSS variables, base + shared styles
│   └── main.tsx                # App entry point
```

## Getting Started

### Prerequisites

- **Node.js `^20.19.0` or `>=22.12.0`** (required by Vite 8)
- The backend (`server/`) running on `http://localhost:4000`

### Installation

```bash
cd admin
npm install
```

### Running Locally

```bash
npm run dev
```

Vite starts a dev server (default `http://localhost:5173`) and proxies `/api`
requests to the backend at `http://localhost:4000` (see `vite.config.ts`), so
no CORS configuration is needed in development.

Seed credentials: `admin@webcrm.com` / `Admin@123456`

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

## Configuration

| File | What it controls |
| --- | --- |
| `src/config/api.ts` | `BASE_URL` (`/api/v1`) used by the Axios client. |
| `src/config/branding.ts` | Branding defaults and the `localStorage` key; editable in Settings. |
| `vite.config.ts` | Dev proxy for `/api` → backend. |

## Known Limitations

- **Platform admins cannot delete organizations or website users** — the
  backend reserves those actions for the master; the UI hides the buttons for
  non-master accounts.
- **Assigned-admins list** is visible to the master only (the API gates
  `organization:assign` to the master).
- **Dashboard growth chart** uses sample data until the backend exposes
  time-series metrics.
