import { useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isValidEmail } from '../utils/validation'
import '../styles/auth.css'

interface LocationState {
  from?: string
}

function getErrorMessage(error: unknown): string {
  const status = (error as { response?: { status?: number } })?.response?.status
  const message = (error as { response?: { data?: { message?: string } } })?.response
    ?.data?.message
  if (message) return message
  if (status === 401) return 'Invalid email or password.'
  return 'Something went wrong. Please try again.'
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!isValidEmail(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      await login({ email: email.trim(), password })
      const target = (location.state as LocationState | null)?.from ?? '/'
      navigate(target, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit} noValidate>
      {error && <div className="login__error">{error}</div>}

      <div className="login__field">
        <label className="login__label" htmlFor="email">
          Email
        </label>
        <div className="login__control">
          <Mail className="login__icon" size={16} />
          <input
            id="email"
            className="input"
            type="email"
            autoComplete="username"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setError('')
            }}
          />
        </div>
      </div>

      <div className="login__field">
        <label className="login__label" htmlFor="password">
          Password
        </label>
        <div className="login__control">
          <Lock className="login__icon" size={16} />
          <input
            id="password"
            className="input"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
          />
          <button
            type="button"
            className="login__toggle"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn--primary login__submit"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="spin" size={16} />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>

      <div className="login__demo">
        Demo: <strong>admin@webcrm.com</strong> / <strong>Admin@123456</strong>
      </div>
    </form>
  )
}

export default Login
