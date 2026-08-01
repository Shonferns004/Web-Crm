import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Bell, Palette, RotateCcw, Save, Trash2, Upload, User } from 'lucide-react'
import { useBranding } from '../hooks/useBranding'
import '../styles/pages.css'

interface ProfileForm {
  name: string
  email: string
  role: string
  department: string
}

interface NotificationPrefs {
  emailUpdates: boolean
  securityAlerts: boolean
  weeklyDigest: boolean
}

const INITIAL_PROFILE: ProfileForm = {
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'Admin',
  department: 'Operations',
}

const INITIAL_PREFS: NotificationPrefs = {
  emailUpdates: true,
  securityAlerts: true,
  weeklyDigest: false,
}

function Settings() {
  const [profile, setProfile] = useState<ProfileForm>(INITIAL_PROFILE)
  const [prefs, setPrefs] = useState<NotificationPrefs>(INITIAL_PREFS)
  const [saved, setSaved] = useState(false)
  const { branding, updateBranding, resetBranding } = useBranding()
  const logoInputRef = useRef<HTMLInputElement>(null)

  function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateBranding({ logoUrl: reader.result })
      }
    }
    reader.readAsDataURL(file)
  }

  function updateProfile(field: keyof ProfileForm, value: string) {
    setProfile((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  function updatePref(field: keyof NotificationPrefs) {
    setPrefs((current) => ({ ...current, [field]: !current[field] }))
    setSaved(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1 className="page__title">Settings</h1>
          <p className="page__subtitle">Manage your account preferences.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="settings-grid">
          <section className="card settings-section">
            <h2 className="settings-section__title">
              <User size={16} /> Profile
            </h2>
            <p className="settings-section__hint">
              Update your personal information shown across the panel.
            </p>

            <div className="settings-form">
              <div className="input-group">
                <label className="input-group__label" htmlFor="full-name">
                  Full Name
                </label>
                <input
                  id="full-name"
                  className="input"
                  type="text"
                  value={profile.name}
                  onChange={(event) => updateProfile('name', event.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-group__label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  value={profile.email}
                  onChange={(event) => updateProfile('email', event.target.value)}
                />
              </div>

              <div className="settings-form__row">
                <div className="input-group">
                  <label className="input-group__label" htmlFor="role">
                    Role
                  </label>
                  <select
                    id="role"
                    className="select"
                    value={profile.role}
                    onChange={(event) => updateProfile('role', event.target.value)}
                  >
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-group__label" htmlFor="department">
                    Department
                  </label>
                  <input
                    id="department"
                    className="input"
                    type="text"
                    value={profile.department}
                    onChange={(event) =>
                      updateProfile('department', event.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="card settings-section">
            <h2 className="settings-section__title">
              <Bell size={16} /> Notifications
            </h2>
            <p className="settings-section__hint">
              Choose which emails you would like to receive.
            </p>

            <div className="settings-form">
              {(
                [
                  ['emailUpdates', 'Email Updates', 'Product news and feature announcements'],
                  ['securityAlerts', 'Security Alerts', 'Important account security notifications'],
                  ['weeklyDigest', 'Weekly Digest', 'A summary of activity across your workspace'],
                ] as const
              ).map(([key, title, hint]) => (
                <label className="settings-check" key={key}>
                  <input
                    type="checkbox"
                    checked={prefs[key]}
                    onChange={() => updatePref(key)}
                  />
                  <span className="settings-check__body">
                    <span className="settings-check__title">{title}</span>
                    <span className="settings-check__hint">{hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="card settings-section settings-section--wide">
            <h2 className="settings-section__title">
              <Palette size={16} /> Customize Branding
            </h2>
            <p className="settings-section__hint">
              Adjust how the panel looks in the top bar. Changes apply instantly.
            </p>

            <div className="settings-form">
              <div className="branding-logo">
                <span className="branding-logo__preview">
                  {branding.logoUrl ? (
                    <img
                      className="branding-logo__img"
                      src={branding.logoUrl}
                      alt="Logo preview"
                    />
                  ) : (
                    <span className="branding-logo__letter">
                      {branding.logoLetter || 'A'}
                    </span>
                  )}
                </span>

                <div className="branding-logo__body">
                  <div className="branding-logo__controls">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Upload size={16} />
                      Upload Logo
                    </button>
                    {branding.logoUrl && (
                      <button
                        type="button"
                        className="btn btn--ghost"
                        onClick={() => updateBranding({ logoUrl: '' })}
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    )}
                    <input
                      ref={logoInputRef}
                      className="sr-only"
                      type="file"
                      accept="image/png, image/jpeg, image/svg+xml, image/webp"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  <p className="branding-logo__hint">
                    PNG, JPG, SVG or WebP. Replaces the logo letter in the top
                    bar.
                  </p>
                </div>
              </div>

              <div className="input-group">
                <label className="input-group__label" htmlFor="app-name">
                  App Name
                </label>
                <input
                  id="app-name"
                  className="input"
                  type="text"
                  value={branding.appName}
                  maxLength={40}
                  onChange={(event) =>
                    updateBranding({ appName: event.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label className="input-group__label" htmlFor="logo-letter">
                  Logo Letter
                </label>
                <input
                  id="logo-letter"
                  className="input"
                  type="text"
                  value={branding.logoLetter}
                  maxLength={1}
                  onChange={(event) =>
                    updateBranding({ logoLetter: event.target.value })
                  }
                />
              </div>

              <div className="settings-form__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={resetBranding}
                >
                  <RotateCcw size={16} />
                  Reset to Default
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="settings-form__actions">
          {saved && <span className="badge badge--success">Changes saved</span>}
          <button type="button" className="btn btn--ghost">
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
