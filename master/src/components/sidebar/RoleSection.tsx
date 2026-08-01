import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { roleService, ROLES_UPDATED_EVENT } from '../../services/roleService'

export function SidebarRoleSection() {
  const location = useLocation()
  const [count, setCount] = useState(0)

  const loadCount = useCallback(async () => {
    try {
      const result = await roleService.list()
      setCount(result.length)
    } catch {
      setCount(0)
    }
  }, [])

  useEffect(() => {
    void loadCount()
    window.addEventListener(ROLES_UPDATED_EVENT, loadCount)
    return () => window.removeEventListener(ROLES_UPDATED_EVENT, loadCount)
  }, [loadCount])

  const active = location.pathname === '/role'

  return (
    <Link
      to="/role"
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
              d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
          Role
        </span>
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
          {count}
        </span>
      </Link>
  )
}
