import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  ChevronDown,
  Globe,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  X,
} from 'lucide-react'
import { useBranding } from '../hooks/useBranding'
import { useAuth } from '../context/AuthContext'
import '../styles/main-layout.css'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/websites', label: 'Websites', icon: Globe },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function initials(name: string, email: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return (name.trim()[0] || email[0] || 'A').toUpperCase()
}

function MainLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const { branding } = useBranding()
  const { user, logout } = useAuth()

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email
    : ''

  return (
    <div className="app-shell">
      <header className="navbar">
        <button
          type="button"
          className="navbar__menu"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        >
          {navOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link
          to="/"
          className="navbar__brand"
          onClick={() => setNavOpen(false)}
        >
          <span className="navbar__logo">
            {branding.logoUrl ? (
              <img
                className="navbar__logo-img"
                src={branding.logoUrl}
                alt={`${branding.appName} logo`}
              />
            ) : (
              branding.logoLetter || branding.appName.charAt(0)
            )}
          </span>
          <strong className="navbar__name">{branding.appName}</strong>
        </Link>

        <nav
          className={`navbar__nav ${navOpen ? 'navbar__nav--open' : ''}`}
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
                onClick={() => setNavOpen(false)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="navbar__right">
          <div className="navbar__search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search resources..."
              aria-label="Search resources"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                className="navbar__search-clear"
                aria-label="Clear search"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="navbar__action"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="navbar__badge" />
          </button>

          <div className="navbar__profile" ref={profileRef}>
            <button
              type="button"
              className="navbar__avatar"
              aria-haspopup="true"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((open) => !open)}
            >
              <span className="navbar__avatar-text">
                {user ? initials(displayName, user.email) : 'A'}
              </span>
              <ChevronDown size={15} />
            </button>

            {profileOpen && (
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-head">
                  <strong>{displayName || 'User'}</strong>
                  <span>{user?.email}</span>
                </div>
                <Link
                  to="/settings"
                  className="navbar__dropdown-item"
                  onClick={() => setProfileOpen(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  className="navbar__dropdown-item"
                  onClick={() => {
                    setProfileOpen(false)
                    void logout()
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
