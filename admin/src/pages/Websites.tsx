import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react'
import Modal from '../components/Modal'
import {
  addWebsite,
  deleteWebsite,
  getWebsites,
  updateWebsite,
} from '../services/websiteService'
import type { WebsiteInput } from '../services/websiteService'
import type { Website } from '../types'
import '../styles/pages.css'

type FormErrors = Partial<Record<keyof WebsiteInput, string>>

const EMPTY_FORM: WebsiteInput = {
  name: '',
  url: '',
  username: '',
  password: '',
}

const URL_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i

function validateForm(form: WebsiteInput): FormErrors {
  const errors: FormErrors = {}

  if (form.name.trim().length === 0) {
    errors.name = 'Website name is required.'
  }

  if (form.url.trim().length === 0) {
    errors.url = 'Website URL is required.'
  } else if (!URL_PATTERN.test(form.url.trim())) {
    errors.url = 'Please enter a valid URL (e.g. https://example.com).'
  }

  if (form.username.trim().length === 0) {
    errors.username = 'Username is required.'
  }

  if (form.password.length === 0) {
    errors.password = 'Password is required.'
  }

  return errors
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }
  return <span className="field-error">{message}</span>
}

function WebsiteFormModal({
  initial,
  onClose,
  onSave,
}: {
  initial: WebsiteInput
  onClose: () => void
  onSave: (form: WebsiteInput) => Promise<void>
}) {
  const [form, setForm] = useState<WebsiteInput>(initial)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const isEditing = initial.name.length > 0

  function updateField(field: keyof WebsiteInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateForm(form)
    setErrors(nextErrors)

    if (Object.values(nextErrors).some((message) => message !== undefined)) {
      return
    }

    setIsSaving(true)
    await onSave(form)
  }

  return (
    <Modal title={isEditing ? 'Edit Website' : 'Add Website'} onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <label className="input-group__label" htmlFor="website-name">
            Website Name
          </label>
          <input
            id="website-name"
            className={`input ${errors.name ? 'input--error' : ''}`}
            type="text"
            placeholder="e.g. Being Sevak"
            value={form.name}
            aria-invalid={errors.name !== undefined}
            onChange={(event) => updateField('name', event.target.value)}
          />
          <FieldError message={errors.name} />
        </div>

        <div className="input-group">
          <label className="input-group__label" htmlFor="website-url">
            Website URL
          </label>
          <input
            id="website-url"
            className={`input ${errors.url ? 'input--error' : ''}`}
            type="text"
            inputMode="url"
            placeholder="https://example.com"
            value={form.url}
            aria-invalid={errors.url !== undefined}
            onChange={(event) => updateField('url', event.target.value)}
          />
          <FieldError message={errors.url} />
        </div>

        <div className="input-group">
          <label className="input-group__label" htmlFor="website-username">
            Username
          </label>
          <input
            id="website-username"
            className={`input ${errors.username ? 'input--error' : ''}`}
            type="text"
            autoComplete="off"
            placeholder="Login username"
            value={form.username}
            aria-invalid={errors.username !== undefined}
            onChange={(event) => updateField('username', event.target.value)}
          />
          <FieldError message={errors.username} />
        </div>

        <div className="input-group">
          <label className="input-group__label" htmlFor="website-password">
            Password
          </label>
          <div className="password-field">
            <input
              id="website-password"
              className={`input ${errors.password ? 'input--error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Login password"
              value={form.password}
              aria-invalid={errors.password !== undefined}
              onChange={(event) => updateField('password', event.target.value)}
            />
            <button
              type="button"
              className="password-field__toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FieldError message={errors.password} />
        </div>

        <div className="modal__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="spin" size={16} />
                Saving...
              </>
            ) : isEditing ? (
              'Save Changes'
            ) : (
              'Add Website'
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
}

function CredentialsCell({ website }: { website: Website }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="credentials">
      <span className="credentials__username">{website.username}</span>
      <div className="credentials__row">
        <span className="credentials__password">
          {revealed ? website.password : '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
        </span>
        <button
          type="button"
          className="icon-btn icon-btn--sm"
          aria-label={revealed ? 'Hide password' : 'Show password'}
          onClick={() => setRevealed((current) => !current)}
        >
          {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  )
}

function WebsiteItem({
  website,
  onEdit,
  onDelete,
}: {
  website: Website
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <li className="card website-item">
      <div className="website-item__top">
        <span className="website-item__name">
          <span className="website-item__icon">
            <Globe size={18} />
          </span>
          <span className="website-item__name-text">{website.name}</span>
        </span>
        <span
          className={`status-badge ${website.status === 'active' ? 'status-badge--active' : 'status-badge--inactive'}`}
        >
          {website.status}
        </span>
      </div>

      <p className="website-item__url">
        <span className="website-item__url-text">{website.url}</span>
        <ExternalLink size={13} />
      </p>

      <CredentialsCell website={website} />

      <div className="website-item__actions">
        <button
          type="button"
          className="btn btn--ghost website-item__action"
          onClick={onEdit}
        >
          <Edit3 size={16} />
          Edit
        </button>
        <button
          type="button"
          className="btn btn--ghost website-item__action website-item__action--danger"
          onClick={onDelete}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </li>
  )
}

function WebsiteItemSkeleton() {
  return (
    <li className="card website-item">
      <div className="website-item__top">
        <div className="skeleton skeleton--bar" style={{ width: '45%' }} />
        <div className="skeleton skeleton--bar" style={{ width: '24%' }} />
      </div>
      <div className="skeleton skeleton--bar" style={{ width: '75%' }} />
      <div className="skeleton skeleton--bar" style={{ width: '55%' }} />
      <div className="skeleton skeleton--bar" style={{ width: '40%' }} />
    </li>
  )
}

function Websites() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null)

  useEffect(() => {
    let cancelled = false

    getWebsites()
      .then((data) => {
        if (!cancelled) {
          setWebsites(data)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  function openAddModal() {
    setEditingWebsite(null)
    setIsModalOpen(true)
  }

  function openEditModal(website: Website) {
    setEditingWebsite(website)
    setIsModalOpen(true)
  }

  async function handleSave(form: WebsiteInput) {
    if (editingWebsite) {
      const updated = await updateWebsite(editingWebsite.id, form)
      setWebsites((current) =>
        current.map((website) =>
          website.id === updated.id ? updated : website,
        ),
      )
    } else {
      const created = await addWebsite(form)
      setWebsites((current) => [...current, created])
    }

    setIsModalOpen(false)
    setEditingWebsite(null)
  }

  async function handleDelete(websiteId: string) {
    await deleteWebsite(websiteId)
    setWebsites((current) =>
      current.filter((website) => website.id !== websiteId),
    )
  }

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1 className="page__title">Websites</h1>
          <p className="page__subtitle">
            Manage the websites users are assigned to.
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAddModal}>
          <Plus size={16} />
          Add Website
        </button>
      </header>

      <div className="card">
        <div className="table-scroll table-scroll--desktop">
          <table className="table" aria-busy={isLoading}>
          <thead>
            <tr>
              <th>Website</th>
              <th>URL</th>
              <th>Credentials</th>
              <th>Status</th>
              <th className="table__right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              {[0, 1, 2].map((row) => (
                <tr key={row}>
                  {[0, 1, 2, 3, 4].map((cell) => (
                    <td key={cell}>
                      <div
                        className="skeleton skeleton--bar"
                        style={{
                          width: `${48 + (((row + cell) * 13) % 40)}%`,
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : websites.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div className="empty-state">
                    <Globe size={28} />
                    <p className="empty-state__title">No websites yet</p>
                    <p className="empty-state__hint">
                      Add your first website to start managing credentials.
                    </p>
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={openAddModal}
                    >
                      <Plus size={16} />
                      Add Website
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {websites.map((website) => (
                <tr key={website.id}>
                  <td>
                    <span className="website-name">
                      <Globe size={16} />
                      {website.name}
                    </span>
                  </td>
                  <td>{website.url}</td>
                  <td>
                    <CredentialsCell website={website} />
                  </td>
                  <td>
                    <span
                      className={`status-badge ${website.status === 'active' ? 'status-badge--active' : 'status-badge--inactive'}`}
                    >
                      {website.status}
                    </span>
                  </td>
                  <td className="table__right">
                    <div className="table-actions">
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`Edit ${website.name}`}
                        onClick={() => openEditModal(website)}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn icon-btn--danger"
                        aria-label={`Delete ${website.name}`}
                        onClick={() => handleDelete(website.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        </div>

        {isLoading ? (
          <ul className="website-list website-list--mobile">
            {[0, 1, 2].map((item) => (
              <WebsiteItemSkeleton key={item} />
            ))}
          </ul>
        ) : (
          <ul className="website-list website-list--mobile">
            {websites.map((website) => (
              <WebsiteItem
                key={website.id}
                website={website}
                onEdit={() => openEditModal(website)}
                onDelete={() => handleDelete(website.id)}
              />
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <WebsiteFormModal
          initial={
            editingWebsite
              ? {
                  name: editingWebsite.name,
                  url: editingWebsite.url,
                  username: editingWebsite.username,
                  password: editingWebsite.password,
                }
              : EMPTY_FORM
          }
          onClose={() => {
            setIsModalOpen(false)
            setEditingWebsite(null)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default Websites
