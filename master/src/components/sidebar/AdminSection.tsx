import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { adminService } from '../../services/adminService'

const ADMINS_UPDATED_EVENT = 'admins:updated'

export function SidebarAdminSection() {
  const location = useLocation()
  const [count, setCount] = useState(0)

  const loadCount = useCallback(async () => {
    try {
      const result = await adminService.list()
      setCount(result.length)
    } catch {
      setCount(0)
    }
  }, [])

  useEffect(() => {
    void loadCount()
    window.addEventListener(ADMINS_UPDATED_EVENT, loadCount)
    return () => window.removeEventListener(ADMINS_UPDATED_EVENT, loadCount)
  }, [loadCount])

  const active = location.pathname === '/admin'

  return (
    <Link
      to="/admin"
      aria-current={active ? 'page' : undefined}
        className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
          active
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
        }`}
      >
        <span className="flex items-center gap-3">
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
          Admin
        </span>
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
          {count}
        </span>
      </Link>
  )
}
