import type { AdminUser } from '../../types/admin'
import { useToast } from '../../context/ToastContext'

interface AdminTableProps {
  admins: AdminUser[]
  loading: boolean
}

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export function AdminTable({ admins, loading }: AdminTableProps) {
  const toast = useToast()

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-14 animate-pulse rounded-xl bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (admins.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-12 text-center">
        <p className="text-sm font-medium text-slate-600">No admins yet</p>
        <p className="mt-1 text-sm text-slate-400">
          Click “Admin Stack” to create your first admin user.
        </p>
      </div>
    )
  }

  const copyCredentials = async (admin: AdminUser) => {
    try {
      await navigator.clipboard.writeText(
        `Username: ${admin.username}\nPassword: ${admin.password}`,
      )
      toast.success({
        title: 'Credentials copied',
        description: `Copied login details for "${admin.username}".`,
      })
    } catch {
      toast.error({ title: 'Could not copy credentials' })
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th
              scope="col"
              className="px-5 py-3 text-left font-semibold text-slate-600"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-left font-semibold text-slate-600"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-left font-semibold text-slate-600"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-left font-semibold text-slate-600"
            >
              Created
            </th>
            <th scope="col" className="px-5 py-3 text-right">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {admins.map((admin) => (
            <tr key={admin.id} className="transition hover:bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-3.5 font-medium text-slate-900">
                {admin.username}
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">
                <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  {admin.role === 'master' ? 'Master Admin' : 'Site Admin'}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-3.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {admin.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">
                {formatDate(admin.createdAt)}
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-right">
                <button
                  type="button"
                  onClick={() => copyCredentials(admin)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                    <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                  </svg>
                  Copy credentials
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
