import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  AlertTriangle,
  Check,
  Copy,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import {
  createOrganization,
  deleteOrganization,
  getOrganizations,
  updateOrganization,
} from '../services/organizationService'
import type { Organization } from '../types'
import { useAuth } from '../context/AuthContext'
import { isValidEmail } from '../utils/validation'
import '../styles/pages.css'

interface WebsiteForm {
  name: string
  website: string
  email: string
  phone: string
  description: string
  status: 'ACTIVE' | 'SUSPENDED'
}

type FormErrors = Partial<Record<keyof WebsiteForm, string>>

const EMPTY_FORM: WebsiteForm = {
  name: '',
  website: '',
  email: '',
  phone: '',
  description: '',
  status: 'ACTIVE',
}

const URL_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i

function validateForm(form: WebsiteForm): FormErrors {
  const errors: FormErrors = {}

  if (form.name.trim().length === 0) {
    errors.name = 'Website name is required.'
  }

  if (form.website.trim().length === 0) {
    errors.website = 'Website URL is required.'
  } else if (!URL_PATTERN.test(form.website.trim())) {
    errors.website = 'Please enter a valid URL (e.g. https://example.com).'
  }

  if (form.email.trim().length > 0 && !isValidEmail(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  return errors
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }
  return <span className="field-error">{message}</span>
}

function getErrorMessage(error: unknown): string {
  return (
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message ?? 'Something went wrong. Please try again.'
  )
}

function WebsiteFormModal({
  initial,
  isEditing,
  onClose,
  onSave,
}: {
  initial: WebsiteForm
  isEditing: boolean
  onClose: () => void
  onSave: (form: WebsiteForm) => Promise<void>
}) {
  const [form, setForm] = useState<WebsiteForm>(initial)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState('')

  function updateField(field: keyof WebsiteForm, value: string) {
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
    setFormError('')
    try {
      await onSave(form)
    } catch (error) {
      setFormError(getErrorMessage(error))
      setIsSaving(false)
    }
  }

  return (
    <Modal title={isEditing ? 'Edit Website' : 'Add Website'} onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        {formError && <div className="modal-form__error">{formError}</div>}

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
            className={`input ${errors.website ? 'input--error' : ''}`}
            type="text"
            inputMode="url"
            placeholder="https://example.com"
            value={form.website}
            aria-invalid={errors.website !== undefined}
            onChange={(event) => updateField('website', event.target.value)}
          />
          <FieldError message={errors.website} />
        </div>

        <div className="input-group">
          <label className="input-group__label" htmlFor="website-email">
            Contact Email
          </label>
          <input
            id="website-email"
            className={`input ${errors.email ? 'input--error' : ''}`}
            type="email"
            placeholder="contact@example.com (optional)"
            value={form.email}
            aria-invalid={errors.email !== undefined}
            onChange={(event) => updateField('email', event.target.value)}
          />
          <FieldError message={errors.email} />
        </div>

        <div className="input-group">
          <label className="input-group__label" htmlFor="website-phone">
            Contact Phone
          </label>
          <input
            id="website-phone"
            className="input"
            type="text"
            placeholder="+91 00000 00000 (optional)"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-group__label" htmlFor="website-description">
            Description
          </label>
          <textarea
            id="website-description"
            className="input"
            rows={3}
            placeholder="Short description (optional)"
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
          />
        </div>

        {isEditing && (
          <div className="input-group">
            <label className="input-group__label" htmlFor="website-status">
              Status
            </label>
            <select
              id="website-status"
              className="select"
              value={form.status}
              onChange={(event) =>
                updateField('status', event.target.value as WebsiteForm['status'])
              }
            >
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        )}

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

function CredentialModal({
  email,
  password,
  onClose,
}: {
  email: string
  password?: string
  onClose: () => void
}) {
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(
    null,
  )
  const [revealed, setRevealed] = useState(false)

  async function copy(field: 'email' | 'password', value: string) {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // clipboard unavailable; still show confirmation
    }
    setCopiedField(field)
    window.setTimeout(() => setCopiedField(null), 1500)
  }

  function CopyButton({ field, value }: { field: 'email' | 'password'; value: string }) {
    return (
      <button
        type="button"
        className="icon-btn"
        aria-label={`Copy ${field}`}
        onClick={() => copy(field, value)}
      >
        {copiedField === field ? <Check size={15} /> : <Copy size={15} />}
      </button>
    )
  }

  return (
    <Modal
      title="Website credentials created"
      onClose={onClose}
    >
      <div className="credential-modal">
        <div className="credential-modal__notice">
          <AlertTriangle size={18} />
          <p>
            The website-user password below is shown <strong>only once</strong>.
            Copy it now — it cannot be retrieved later.
          </p>
        </div>

        <div className="credential-modal__row">
          <span className="credential-modal__label">Username (email)</span>
          <div className="credential-modal__value">
            <code>{email}</code>
            <CopyButton field="email" value={email} />
          </div>
        </div>

        <div className="credential-modal__row">
          <span className="credential-modal__label">Password</span>
          <div className="credential-modal__value">
            <code>{revealed ? password : '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}</code>
            <button
              type="button"
              className="icon-btn"
              aria-label={revealed ? 'Hide password' : 'Show password'}
              onClick={() => setRevealed((current) => !current)}
            >
              {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
            {password && <CopyButton field="password" value={password} />}
          </div>
        </div>

        <div className="modal__actions">
          <button type="button" className="btn btn--primary" onClick={onClose}>
            I&apos;ve saved the credentials
          </button>
        </div>
      </div>
    </Modal>
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
      <div className="skeleton skeleton--bar" style={{ width: '40%' }} />
    </li>
  )
}

function Websites() {
  const [websites, setWebsites] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingWebsite, setEditingWebsite] = useState<Organization | null>(null)
  const [pendingCredential, setPendingCredential] = useState<{
    email: string
    password?: string
  } | null>(null)
  const [pageError, setPageError] = useState('')
  const { user } = useAuth()

  const canDelete = user?.isMaster === true

  useEffect(() => {
    let cancelled = false

    getOrganizations({ page: 1, limit: 100 })
      .then((data) => {
        if (!cancelled) {
          setWebsites(data.items)
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setPageError(getErrorMessage(error))
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
    setPageError('')
    setIsModalOpen(true)
  }

  function openEditModal(website: Organization) {
    setEditingWebsite(website)
    setPageError('')
    setIsModalOpen(true)
  }

  function toForm(website: Organization): WebsiteForm {
    return {
      name: website.name,
      website: website.website ?? '',
      email: website.email ?? '',
      phone: website.phone ?? '',
      description: website.description ?? '',
      status: website.status,
    }
  }

  async function handleSave(form: WebsiteForm) {
    if (editingWebsite) {
      const updated = await updateOrganization(editingWebsite.id, {
        name: form.name,
        website: form.website || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        description: form.description.trim() || null,
        status: form.status,
      })
      setWebsites((current) =>
        current.map((website) =>
          website.id === updated.id ? { ...website, ...updated } : website,
        ),
      )
    } else {
      const created = await createOrganization({
        name: form.name,
        website: form.website,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        description: form.description.trim() || null,
      })
      setWebsites((current) => [created, ...current])
      setPendingCredential({
        email: created.webUser.email,
        password: created.webUser.password,
      })
    }

    setIsModalOpen(false)
    setEditingWebsite(null)
  }

  async function handleDelete(website: Organization) {
    const confirmed = window.confirm(
      `Delete "${website.name}"? This action cannot be undone.`,
    )
    if (!confirmed) {
      return
    }

    setPageError('')
    try {
      await deleteOrganization(website.id)
      setWebsites((current) =>
        current.filter((item) => item.id !== website.id),
      )
    } catch (error) {
      setPageError(getErrorMessage(error))
    }
  }

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1 className="page__title">Websites</h1>
          <p className="page__subtitle">
            Create and manage the websites under your platform.
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAddModal}>
          <Plus size={16} />
          Add Website
        </button>
      </header>

      {pageError && <div className="page-error">{pageError}</div>}

      <div className="card">
        <div className="table-scroll table-scroll--desktop">
          <table className="table" aria-busy={isLoading}>
            <thead>
              <tr>
                <th>Website</th>
                <th>URL / Slug</th>
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
                    {[0, 1, 2, 3].map((cell) => (
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
                  <td colSpan={4}>
                    <div className="empty-state">
                      <Globe size={28} />
                      <p className="empty-state__title">No websites yet</p>
                      <p className="empty-state__hint">
                        Add your first website to start managing it.
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
                      <Link
                        to={`/websites/${website.id}`}
                        className="website-name"
                      >
                        <Globe size={16} />
                        {website.name}
                      </Link>
                    </td>
                    <td>
                      {website.website ? (
                        <a
                          href={website.website}
                          target="_blank"
                          rel="noreferrer"
                          className="website-url-link"
                        >
                          {website.website}
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        website.slug
                      )}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          website.status === 'ACTIVE'
                            ? 'status-badge--active'
                            : 'status-badge--inactive'
                        }`}
                      >
                        {website.status.toLowerCase()}
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
                        {canDelete && (
                          <button
                            type="button"
                            className="icon-btn icon-btn--danger"
                            aria-label={`Delete ${website.name}`}
                            onClick={() => handleDelete(website)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
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
              <li className="card website-item" key={website.id}>
                <div className="website-item__top">
                  <Link
                    to={`/websites/${website.id}`}
                    className="website-item__name"
                  >
                    <span className="website-item__icon">
                      <Globe size={18} />
                    </span>
                    <span className="website-item__name-text">
                      {website.name}
                    </span>
                  </Link>
                  <span
                    className={`status-badge ${
                      website.status === 'ACTIVE'
                        ? 'status-badge--active'
                        : 'status-badge--inactive'
                    }`}
                  >
                    {website.status.toLowerCase()}
                  </span>
                </div>

                <p className="website-item__url">
                  <span className="website-item__url-text">
                    {website.website ?? website.slug}
                  </span>
                  <ExternalLink size={13} />
                </p>

                <div className="website-item__actions">
                  <button
                    type="button"
                    className="btn btn--ghost website-item__action"
                    onClick={() => openEditModal(website)}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                  {canDelete && (
                    <button
                      type="button"
                      className="btn btn--ghost website-item__action website-item__action--danger"
                      onClick={() => handleDelete(website)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <WebsiteFormModal
          isEditing={editingWebsite !== null}
          initial={editingWebsite ? toForm(editingWebsite) : EMPTY_FORM}
          onClose={() => {
            setIsModalOpen(false)
            setEditingWebsite(null)
          }}
          onSave={handleSave}
        />
      )}

      {pendingCredential && (
        <CredentialModal
          email={pendingCredential.email}
          password={pendingCredential.password}
          onClose={() => setPendingCredential(null)}
        />
      )}
    </div>
  )
}

export default Websites
