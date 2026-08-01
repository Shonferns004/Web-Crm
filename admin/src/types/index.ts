/** Possible operational states of a managed website. */
export type WebsiteStatus = 'active' | 'inactive'

/**
 * A managed website and its login credentials.
 *
 * Represents one site in the portfolio. Each website carries the credentials
 * a user logs in with; on login the user is redirected to the site's `url`.
 */
export interface Website {
  /** Unique identifier for the website. */
  id: string
  /** Display name shown in the dashboard and websites list. */
  name: string
  /** The site's URL; the login page redirects the assigned user here. */
  url: string
  /** Username used to sign in to this website. */
  username: string
  /** Plain-text password for this website (mock only — hash before any real backend use). */
  password: string
  /** Whether the website is currently active or inactive. */
  status: WebsiteStatus
}
