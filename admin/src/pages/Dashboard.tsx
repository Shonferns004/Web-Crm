import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Globe,
  Layers,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getOverview, getWebsites } from '../services/dashboardService'
import type { DashboardOverview, Organization } from '../types'
import '../styles/pages.css'

type StatTone = 'indigo' | 'teal' | 'amber' | 'coral'

interface Stat {
  id: string
  label: string
  value: string
  badge: string
  tone: StatTone
  icon: LucideIcon
}

interface ChartDatum {
  label: string
  value: number
}

interface DonutSegment {
  label: string
  value: number
  color: string
}

type RangeKey = 'ytd' | 'last-6-months' | 'last-3-months' | 'last-30-days'

interface RangeOption {
  key: RangeKey
  label: string
}

const RANGE_OPTIONS: RangeOption[] = [
  { key: 'ytd', label: 'Year to Date' },
  { key: 'last-6-months', label: 'Last 6 Months' },
  { key: 'last-3-months', label: 'Last 3 Months' },
  { key: 'last-30-days', label: 'Last 30 Days' },
]

// Illustrative sample data: the API does not expose time-series growth yet.
const RANGE_DATA: Record<RangeKey, ChartDatum[]> = {
  ytd: [
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 42 },
    { label: 'Mar', value: 36 },
    { label: 'Apr', value: 55 },
    { label: 'May', value: 48 },
    { label: 'Jun', value: 62 },
    { label: 'Jul', value: 70 },
    { label: 'Aug', value: 66 },
    { label: 'Sep', value: 80 },
    { label: 'Oct', value: 92 },
    { label: 'Nov', value: 84 },
    { label: 'Dec', value: 100 },
  ],
  'last-6-months': [
    { label: 'Jul', value: 70 },
    { label: 'Aug', value: 66 },
    { label: 'Sep', value: 80 },
    { label: 'Oct', value: 92 },
    { label: 'Nov', value: 84 },
    { label: 'Dec', value: 100 },
  ],
  'last-3-months': [
    { label: 'Oct', value: 92 },
    { label: 'Nov', value: 84 },
    { label: 'Dec', value: 100 },
  ],
  'last-30-days': [
    { label: 'Wk 1', value: 22 },
    { label: 'Wk 2', value: 31 },
    { label: 'Wk 3', value: 28 },
    { label: 'Wk 4', value: 36 },
  ],
}

function RangeDropdown({
  value,
  onChange,
}: {
  value: RangeKey
  onChange: (value: RangeKey) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const selected =
    RANGE_OPTIONS.find((option) => option.key === value) ?? RANGE_OPTIONS[0]

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="range-dropdown" ref={rootRef}>
      <button
        type="button"
        className="range-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected.label}</span>
        <ChevronDown
          size={15}
          className={
            open
              ? 'range-dropdown__chevron range-dropdown__chevron--open'
              : 'range-dropdown__chevron'
          }
        />
      </button>

      {open && (
        <ul className="range-dropdown__menu" role="listbox" aria-label="Time range">
          {RANGE_OPTIONS.map((option) => (
            <li key={option.key}>
              <button
                type="button"
                role="option"
                aria-selected={option.key === value}
                className={`range-dropdown__option ${
                  option.key === value ? 'range-dropdown__option--selected' : ''
                }`}
                onClick={() => {
                  onChange(option.key)
                  setOpen(false)
                }}
              >
                <span>{option.label}</span>
                {option.key === value && <Check size={15} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const AREA_WIDTH = 560
const AREA_HEIGHT = 240
const AREA_PAD_X = 10
const AREA_PAD_TOP = 16
const AREA_PAD_BOTTOM = 36
const DONUT_RADIUS = 42
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS
const DONUT_GAP = 4

interface ChartPoint extends ChartDatum {
  x: number
  y: number
}

function AreaChart({ data }: { data: ChartDatum[] }) {
  const maxValue = Math.max(...data.map((datum) => datum.value))
  const plotWidth = AREA_WIDTH - AREA_PAD_X * 2
  const plotHeight = AREA_HEIGHT - AREA_PAD_TOP - AREA_PAD_BOTTOM

  const points: ChartPoint[] = data.map((datum, index) => {
    const x = AREA_PAD_X + (index * plotWidth) / (data.length - 1)
    const y = AREA_PAD_TOP + plotHeight * (1 - datum.value / maxValue)
    return { ...datum, x, y }
  })

  const linePath = points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L'
      return `${command} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
    })
    .join(' ')

  const baseline = AREA_PAD_TOP + plotHeight
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${baseline} L ${points[0].x.toFixed(2)} ${baseline} Z`

  const lastPoint = points[points.length - 1]

  return (
    <div className="area-chart">
      <svg
        className="area-chart__svg"
        viewBox={`0 0 ${AREA_WIDTH} ${AREA_HEIGHT}`}
        role="img"
        aria-label="Websites added over time chart (sample data)"
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = AREA_PAD_TOP + plotHeight * (1 - fraction)
          return (
            <line
              key={fraction}
              className="area-chart__grid"
              x1={AREA_PAD_X}
              y1={y}
              x2={AREA_WIDTH - AREA_PAD_X}
              y2={y}
            />
          )
        })}

        <path d={areaPath} fill="url(#areaFill)" />
        <path className="area-chart__line" d={linePath} fill="none" />
        <circle
          className="area-chart__dot"
          cx={lastPoint.x}
          cy={lastPoint.y}
          r={5}
        />

        {points.map((point) => (
          <text
            key={point.label}
            className="area-chart__label"
            x={point.x}
            y={AREA_HEIGHT - 12}
            textAnchor="middle"
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

function DonutChart({ segments }: { segments: DonutSegment[] }) {
  const total = Math.max(
    segments.reduce((sum, segment) => sum + segment.value, 0),
    1,
  )

  let offset = 0
  const arcs = segments.map((segment) => {
    const dash = Math.max(
      (segment.value / total) * DONUT_CIRCUMFERENCE - DONUT_GAP,
      0,
    )
    const arc = { ...segment, dash, offset }
    offset += (segment.value / total) * DONUT_CIRCUMFERENCE
    return arc
  })

  return (
    <div className="donut">
      <svg className="donut__svg" viewBox="0 0 120 120" role="img" aria-label="Websites by status donut chart">
        <circle
          className="donut__track"
          cx="60"
          cy="60"
          r={DONUT_RADIUS}
          fill="none"
        />
        {arcs.map((arc) => (
          <circle
            key={arc.label}
            className="donut__segment"
            cx="60"
            cy="60"
            r={DONUT_RADIUS}
            fill="none"
            stroke={arc.color}
            strokeDasharray={`${arc.dash.toFixed(2)} ${DONUT_CIRCUMFERENCE.toFixed(2)}`}
            strokeDashoffset={-arc.offset}
            transform="rotate(-90 60 60)"
          />
        ))}
        <text className="donut__value" x="60" y="57" textAnchor="middle">
          {total}
        </text>
        <text className="donut__caption" x="60" y="76" textAnchor="middle">
          websites
        </text>
      </svg>

      <ul className="donut-legend">
        {segments.map((segment) => (
          <li className="donut-legend__item" key={segment.label}>
            <span
              className="donut-legend__dot"
              style={{ background: segment.color }}
            />
            <span className="donut-legend__label">{segment.label}</span>
            <span className="donut-legend__value">{segment.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WebsiteCard({ website }: { website: Organization }) {
  return (
    <Link to={`/websites/${website.id}`} className="card website-card">
      <div className="website-card__top">
        <span className="website-card__icon">
          <Globe size={18} />
        </span>
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
      <p className="website-card__name">{website.name}</p>
      <span className="website-card__url">{website.website ?? website.slug}</span>
    </Link>
  )
}

function WebsiteCardSkeleton() {
  return (
    <div className="card website-card">
      <div className="website-card__top">
        <div className="skeleton skeleton--circle" />
        <div className="skeleton skeleton--bar" style={{ width: '30%' }} />
      </div>
      <div className="skeleton skeleton--bar" style={{ width: '70%' }} />
      <div className="skeleton skeleton--bar" style={{ width: '50%' }} />
    </div>
  )
}

function Dashboard() {
  const [range, setRange] = useState<RangeKey>('ytd')
  const [overview, setOverview] = useState<DashboardOverview | null>(null)
  const [websites, setWebsites] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    Promise.all([getOverview(), getWebsites()])
      .then(([overviewData, websiteData]) => {
        if (!cancelled) {
          setOverview(overviewData)
          setWebsites(websiteData)
        }
      })
      .catch(() => {
        // The axios interceptor handles session expiry; other failures leave
        // the dashboard in its empty state.
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

  const totalWebsites = overview?.organizations ?? websites.length
  const activeWebsites = websites.filter(
    (website) => website.status === 'ACTIVE',
  ).length
  const inactiveWebsites = Math.max(totalWebsites - activeWebsites, 0)
  const activePercent = totalWebsites > 0 ? Math.round((activeWebsites / totalWebsites) * 100) : 0

  const STATUS_SEGMENTS: DonutSegment[] = [
    { label: 'Active', value: activeWebsites, color: '#14b8a6' },
    { label: 'Inactive', value: inactiveWebsites, color: '#cbd5e1' },
  ]

  const STATS: Stat[] = [
    {
      id: 'total-websites',
      label: 'Total Websites',
      value: isLoading ? '—' : String(totalWebsites),
      badge: `${activePercent}% active`,
      tone: 'indigo',
      icon: Globe,
    },
    {
      id: 'active-websites',
      label: 'Active Websites',
      value: isLoading ? '—' : String(activeWebsites),
      badge: `${activePercent}% of total`,
      tone: 'teal',
      icon: CheckCircle2,
    },
    {
      id: 'pages',
      label: 'Pages',
      value: isLoading ? '—' : String(overview?.pages ?? 0),
      badge: 'Across sites',
      tone: 'amber',
      icon: FileText,
    },
    {
      id: 'projects',
      label: 'Projects',
      value: isLoading ? '—' : String(overview?.projects ?? 0),
      badge: 'Across sites',
      tone: 'coral',
      icon: Layers,
    },
  ]

  const mostRecent = websites.length > 0 ? websites[0] : null

  return (
    <div className="page">
      <header className="page__header page__header--center">
        <div>
          <h1 className="page__title">Overview Dashboard</h1>
          <p className="page__subtitle">
            Live status of your managed websites across the platform.
          </p>
        </div>
      </header>

      <section className="stats-grid" aria-label="Key metrics">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div className="card stat-card" key={stat.id}>
              <div className="stat-card__top">
                <span className={`stat-card__icon stat-card__icon--${stat.tone}`}>
                  <Icon size={20} />
                </span>
                <span className="stat-card__badge">{stat.badge}</span>
              </div>
              <p className="stat-card__label">{stat.label}</p>
              <p className="stat-card__value">{stat.value}</p>
            </div>
          )
        })}
      </section>

      <section aria-label="Managed websites">
        <div className="section-heading">
          <div>
            <h2 className="section-heading__title">Managed Websites</h2>
            <p className="section-heading__hint">
              Websites you can manage in this workspace.
            </p>
          </div>
          <Link to="/websites" className="btn btn--primary">
            Manage All
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="website-grid">
          {isLoading ? (
            <>
              <WebsiteCardSkeleton />
              <WebsiteCardSkeleton />
              <WebsiteCardSkeleton />
            </>
          ) : websites.length === 0 ? (
            <div className="card empty-state">
              <Globe size={28} />
              <p className="empty-state__title">No websites yet</p>
              <p className="empty-state__hint">
                Create your first website from the Websites page.
              </p>
            </div>
          ) : (
            websites.map((website) => (
              <WebsiteCard website={website} key={website.id} />
            ))
          )}
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h2 className="dashboard-panel__title">Growth Trajectory</h2>
              <p className="dashboard-panel__hint">
                Website additions —{' '}
                {
                  RANGE_OPTIONS.find((option) => option.key === range)
                    ?.label ?? 'Year to Date'
                }{' '}
                <em>(sample data)</em>
              </p>
            </div>
            <RangeDropdown value={range} onChange={setRange} />
          </div>
          <AreaChart data={RANGE_DATA[range]} />
        </div>

        <div className="card dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h2 className="dashboard-panel__title">Status Breakdown</h2>
              <p className="dashboard-panel__meta">Global Inventory</p>
            </div>
          </div>
          <DonutChart segments={STATUS_SEGMENTS} />
        </div>
      </section>

      <section className="card summary-strip" aria-label="Key insights">
        <div className="summary-strip__item">
          <span className="summary-strip__label">Total Websites</span>
          <strong className="summary-strip__value">
            {isLoading ? '—' : totalWebsites}
          </strong>
        </div>
        <div className="summary-strip__item">
          <span className="summary-strip__label">Active Websites</span>
          <strong className="summary-strip__value">
            {isLoading ? '—' : activeWebsites}
          </strong>
        </div>
        <div className="summary-strip__item">
          <span className="summary-strip__label">Most Recent Addition</span>
          <strong className="summary-strip__value">
            {isLoading ? '—' : mostRecent?.name ?? '—'}
          </strong>
        </div>
        <div className="summary-strip__item">
          <span className="summary-strip__label">Total Donations</span>
          <strong className="summary-strip__value">
            {isLoading ? '—' : overview?.donations ?? 0}
          </strong>
        </div>
      </section>

      {isLoading && (
        <p className="dashboard-loading-hint" role="status">
          <Sparkles size={14} /> Loading live data...
        </p>
      )}
    </div>
  )
}

export default Dashboard
