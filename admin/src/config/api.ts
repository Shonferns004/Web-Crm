/**
 * Base URL for the backend API.
 *
 * The service layer sends requests through the Axios client configured with
 * this value. Point this at a real backend when one is available; until then,
 * requests are intercepted by a mock adapter that serves local data.
 */
export const BASE_URL = 'http://localhost:5000/api'
