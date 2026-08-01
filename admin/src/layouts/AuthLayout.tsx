import { Outlet } from 'react-router-dom'
import { useBranding } from '../hooks/useBranding'
import '../styles/auth.css'

function AuthLayout() {
  const { branding } = useBranding()

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__brand">
          <span className="auth__logo">
            {branding.logoUrl ? (
              <img
                className="auth__logo-img"
                src={branding.logoUrl}
                alt={`${branding.appName} logo`}
              />
            ) : (
              branding.logoLetter || branding.appName.charAt(0)
            )}
          </span>
          <h1 className="auth__title">{branding.appName}</h1>
          <p className="auth__subtitle">Sign in to your workspace</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
