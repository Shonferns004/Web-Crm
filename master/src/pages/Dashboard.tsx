import { useCallback, useEffect, useState } from 'react'
import type { AdminUser } from '../types/admin'
import { MANAGED_WEBSITES } from '../data/websites'
import { adminService } from '../services/adminService'
import { AdminStackCard } from '../components/dashboard/AdminStackCard'
import { AdminTable } from '../components/dashboard/AdminTable'
import { CreateAdminModal } from '../components/admin/CreateAdminModal'

export function Dashboard() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

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
  }, [loadAdmins])

  const handleAdminCreated = (admin: AdminUser) => {
    setAdmins((current) => [...current, admin])
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Control Center
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Master Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage administrators and the {MANAGED_WEBSITES.length} websites under
          your control.
        </p>
      </header>

      <section aria-labelledby="admin-stack-title" className="mb-8">
        <h2
          id="admin-stack-title"
          className="mb-3 text-sm font-semibold text-slate-700"
        >
          Administration
        </h2>
        <AdminStackCard
          adminCount={admins.length}
          onClick={() => setModalOpen(true)}
        />
      </section>

      <section aria-labelledby="admin-list-title">
        <div className="mb-3 flex items-center justify-between">
          <h2
            id="admin-list-title"
            className="text-sm font-semibold text-slate-700"
          >
            Admin users
          </h2>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            New admin
          </button>
        </div>
        <AdminTable admins={admins} loading={loading} />
      </section>

      <CreateAdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleAdminCreated}
      />
    </div>
  )
}
