import type { Website } from '../../types/website'

interface WebsiteCardProps {
  website: Website
  index: number
}

export function WebsiteCard({ website, index }: WebsiteCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
        {index + 1}
      </div>
      <div className="min-w-0">
        <h4 className="truncate text-sm font-semibold text-slate-900">
          {website.name}
        </h4>
        <p className="mt-0.5 truncate text-xs font-medium text-indigo-600">
          {website.url}
        </p>
        <p className="mt-1 text-xs text-slate-500">{website.description}</p>
      </div>
    </div>
  )
}
