import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Palette,
  RotateCcw,
  Save,
  Trash2,
  Upload,
  User,
} from 'lucide-react'
import { useBranding } from '../hooks/useBranding'
import { useAuth } from '../context/AuthContext'
import { changePassword } from '../services/authService'
import { updateProfile } from '../services/userService'
import { isValidEmail } from '../utils/validation'
import '../styles/pages.css'

interface ProfileForm {
  firstName: string
  lastName: string
  email: string
}

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const EMPTY_PROFILE: ProfileForm = {
  firstName: '',
  lastName: '',
  email: '',
}

const EMPTY_PASSWORD: PasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function getErrorMessage(error: unknown): string {
  return (
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message ?? 'Something went wrong. Please try again.'
  )
}

function Settings() {
  const [profile, setProfile] = useState<ProfileForm>(EMPTY_PROFILE)
  const [password, setPassword] = useState<PasswordForm>(EMPTY_PASSWORD)
  const [profileSaving, setProfileSaving] = useState(false)
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [profileError, setProfileError] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const { user, refreshUser } = useAuth()
  const { branding, updateBranding, resetBranding } = useBranding()
  const logoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
      })
    }
  }, [user])

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

  function updateProfileField(field: keyof ProfileForm, value: string) {
    setProfile((current) => ({ ...current, [field]: value }))
    setProfileSaved(false)
    setProfileError('')
  }

  function updatePasswordField(field: keyof PasswordForm, value: string) {
    setPassword((current) => ({ ...current, [field]: value }))
    setPasswordMessage('')
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) return

    setProfileError('')
    if (!isValidEmail(profile.email.trim())) {
      setProfileError('Please enter a valid email address.')
      return
    }
    if (profile.firstName.trim().length === 0) {
      setProfileError('First name is required.')
      return
    }

    setProfileSaving(true)
    try {
      await updateProfile(user.id, {
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim() || null,
        email: profile.email.trim(),
      })
      await refreshUser()
      setProfileSaved(true)
    } catch (error) {
      setProfileError(getErrorMessage(error))
    } finally {
      setProfileSaving(false)
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordMessage('')

    if (password.newPassword.length < 8) {
      setPasswordMessage('New password must be at least 8 characters.')
      return
    }
    if (password.newPassword !== password.confirmPassword) {
      setPasswordMessage('New passwords do not match.')
      return
    }

    setPasswordSaving(true)
    try {
      await changePassword({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      })
      setPassword(EMPTY_PASSWORD)
      setPasswordMessage('Password changed successfully.')
    } catch (error) {
      setPasswordMessage(getErrorMessage(error))
    } finally {
      setPasswordSaving(false)
    }
  }

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1 className="page__title">Settings</h1>
          <p className="page__subtitle">Manage your account and preferences.</p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="card settings-section">
          <h2 className="settings-section__title">
            <User size={16} /> Profile
          </h2>
          <p className="settings-section__hint">
            Update your personal information shown across the panel.
          </p>

          <form className="settings-form" onSubmit={handleProfileSubmit} noValidate>
            {profileError && (
              <div className="modal-form__error">{profileError}</div>
            )}

            <div className="settings-form__row">
              <div className="input-group">
                <label className="input-group__label" htmlFor="first-name">
                  First Name
                </label>
                <input
                  id="first-name"
                  className="input"
                  type="text"
                  value={profile.firstName}
                  onChange={(event) =>
                    updateProfileField('firstName', event.target.value)
                  }
                />
              </div>

              <div className="input-group">
                <label className="input-group__label" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  id="last-name"
                  className="input"
                  type="text"
                  value={profile.lastName}
                  onChange={(event) =>
                    updateProfileField('lastName', event.target.value)
                  }
                />
              </div>
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
                onChange={(event) =>
                  updateProfileField('email', event.target.value)
                }
              />
            </div>

            <div className="settings-form__actions">
              {profileSaved && (
                <span className="badge badge--success">Changes saved</span>
              )}
              <button type="submit" className="btn btn--primary" disabled={profileSaving}>
                {profileSaving ? (
                  <>
                    <Loader2 className="spin" size={16} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <section className="card settings-section">
          <h2 className="settings-section__title">
            <Lock size={16} /> Change Password
          </h2>
          <p className="settings-section__hint">
            Your current password is required to change it.
          </p>

          <form className="settings-form" onSubmit={handlePasswordSubmit} noValidate>
            {passwordMessage && (
              <div
                className={
                  passwordMessage.startsWith('Password changed')
                    ? 'form-message form-message--success'
                    : 'form-message form-message--error'
                }
              >
                {passwordMessage}
              </div>
            )}

            <div className="input-group">
              <label className="input-group__label" htmlFor="current-password">
                Current Password
              </label>
              <div className="password-field">
                <input
                  id="current-password"
                  className="input"
                  type={showCurrent ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password.currentPassword}
                  onChange={(event) =>
                    updatePasswordField('currentPassword', event.target.value)
                  }
                />
                <button
                  type="button"
                  className="password-field__toggle"
                  aria-label={showCurrent ? 'Hide password' : 'Show password'}
                  onClick={() => setShowCurrent((current) => !current)}
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-group__label" htmlFor="new-password">
                New Password
              </label>
              <div className="password-field">
                <input
                  id="new-password"
                  className="input"
                  type={showNew ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password.newPassword}
                  onChange={(event) =>
                    updatePasswordField('newPassword', event.target.value)
                  }
                />
                <button
                  type="button"
                  className="password-field__toggle"
                  aria-label={showNew ? 'Hide password' : 'Show password'}
                  onClick={() => setShowNew((current) => !current)}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-group__label" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                className="input"
                type="password"
                autoComplete="new-password"
                value={password.confirmPassword}
                onChange={(event) =>
                  updatePasswordField('confirmPassword', event.target.value)
                }
              />
            </div>

            <div className="settings-form__actions">
              <button type="submit" className="btn btn--primary" disabled={passwordSaving}>
                {passwordSaving ? (
                  <>
                    <Loader2 className="spin" size={16} />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>
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
    </div>
  )
}

export default Settings
