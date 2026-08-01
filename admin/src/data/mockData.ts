import type { Website } from '../types'

export const MOCK_WEBSITES: Website[] = [
  {
    id: 'w1',
    name: 'Being Sevak',
    url: 'https://beingsevak.example.com',
    username: 'being-sevak',
    password: 'Sevak@2026',
    status: 'active',
  },
  {
    id: 'w2',
    name: 'Mann Care Foundation',
    url: 'https://manncare.example.com',
    username: 'manncare-admin',
    password: 'MannCare@2026',
    status: 'active',
  },
  {
    id: 'w3',
    name: 'Aashray Foundation',
    url: 'https://aashray.example.com',
    username: 'aashray',
    password: 'Aashray@2026',
    status: 'inactive',
  },
]
