import { useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff, Lock, User as UserIcon } from 'lucide-react'
import { MOCK_WEBSITES } from '../data/mockData'
import '../styles/auth.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const website = MOCK_WEBSITES.find(
      (candidate) =>
        candidate.username.toLowerCase() === username.trim().toLowerCase() &&
        candidate.password === password,
    )

    if (!website) {
      setError('Invalid username or password.')
      return
    }

    window.location.href = website.url
  }

  return (
    <form className="login" onSubmit={handleSubmit} noValidate>
      {error && <div className="login__error">{error}</div>}

      <div className="login__field">
        <label className="login__label" htmlFor="username">
          Username
        </label>
        <div className="login__control">
          <UserIcon className="login__icon" size={16} />
          <input
            id="username"
            className="input"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
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

      <button type="submit" className="btn btn--primary login__submit">
        Sign in
      </button>

      <div className="login__demo">
        Demo: <strong>{MOCK_WEBSITES[0].username}</strong> /{' '}
        <strong>{MOCK_WEBSITES[0].password}</strong>
      </div>
    </form>
  )
}

export default Login
