import { useCallback, useEffect, useState } from 'react'
import type { AdminUser } from '../types/admin'
import { MANAGED_WEBSITES } from '../data/websites'
import { adminService } from '../services/adminService'

const ADMINS_UPDATED_EVENT = 'admins:updated'

export function AdminPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  const loadAdmins = useCallback(async () => {
    setLoading(true)
    try {
      const result = await adminService.list()
      setAdmins(result)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadAdmins()
    window.addEventListener(ADMINS_UPDATED_EVENT, loadAdmins)
    return () => window.removeEventListener(ADMINS_UPDATED_EVENT, loadAdmins)
  }, [loadAdmins])

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Administration
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Admin</h1>
        <p className="mt-1 text-sm text-slate-500">
          Admin users created on the platform and the websites they manage.
        </p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : admins.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-16 text-center">
          <p className="text-sm font-medium text-slate-600">No admins yet</p>
          <p className="mt-1 text-sm text-slate-400">
            Create admins from the Master Dashboard to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {admin.username}
                  </p>
                  <p className="text-xs text-slate-500">
                    {admin.role === 'master' ? 'Master Admin' : 'Site Admin'}
                  </p>
                </div>
              </div>
              <ul className="grid gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:grid-cols-3">
                {MANAGED_WEBSITES.map((website) => (
                  <li
                    key={website.id}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-900">
                        {website.name}
                      </span>
                      <span className="block truncate text-xs text-indigo-600">
                        {website.url}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
