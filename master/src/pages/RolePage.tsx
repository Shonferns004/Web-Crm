import { useCallback, useEffect, useState } from 'react'
import type { Role } from '../types/role'
import { roleService, ROLES_UPDATED_EVENT } from '../services/roleService'

export function RolePage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  const loadRoles = useCallback(async () => {
    setLoading(true)
    try {
      const result = await roleService.list()
      setRoles(result)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadRoles()
    window.addEventListener(ROLES_UPDATED_EVENT, loadRoles)
    return () => window.removeEventListener(ROLES_UPDATED_EVENT, loadRoles)
  }, [loadRoles])

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Access control
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Role</h1>
        <p className="mt-1 text-sm text-slate-500">
          Roles available on the platform.
        </p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : roles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-16 text-center">
          <p className="text-sm font-medium text-slate-600">No roles yet</p>
          <p className="mt-1 text-sm text-slate-400">
            Roles will appear here once created.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  {role.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
