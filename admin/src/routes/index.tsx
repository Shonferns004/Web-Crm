import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import Dashboard from '../pages/Dashboard'
import Websites from '../pages/Websites'
import Settings from '../pages/Settings'
import Login from '../pages/Login'

/**
 * Application route tree.
 *
 * - `/login` is wrapped by `AuthLayout` (centered auth card).
 * - Every other route is wrapped by `MainLayout` (top bar + content shell),
 *   so the shared chrome only mounts once for all authenticated pages.
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'websites', element: <Websites /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
])
