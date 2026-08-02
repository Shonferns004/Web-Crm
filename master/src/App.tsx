import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { AdminPage } from './pages/AdminPage'
import { RolePage } from './pages/RolePage'
import { SidebarAdminSection } from './components/sidebar/AdminSection'
import { SidebarRoleSection } from './components/sidebar/RoleSection'

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
  }`

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Master CRM</p>
                <p className="text-xs text-slate-500">Super admin console</p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              <NavLink to="/" className={navLinkClass}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                Dashboard
              </NavLink>
              <SidebarAdminSection />
              <SidebarRoleSection />
            </nav>

            <div className="text-right">
              <p className="text-xs text-slate-400">Signed in as</p>
              <p className="text-sm font-medium text-slate-700">master</p>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/role" element={<RolePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
