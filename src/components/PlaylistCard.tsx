import MoodBadge from './MoodBadge'
import type { PlaylistSummary } from '@/types'

export function PlaylistCard({ p }: { p: PlaylistSummary }) {
  return (
    <a className="grid grid-cols-[96px,1fr] gap-4 rounded-2xl border bg-white p-4 hover:shadow" href={p.url} target="_blank" rel="noreferrer">
      {p.cover_url ? (
        <img src={p.cover_url} alt="cover" className="h-24 w-24 rounded-lg object-cover" />
      ) : (
        <div className="grid h-24 w-24 place-items-center rounded-lg bg-gray-100 text-3xl">🎵</div>
      )}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <MoodBadge mood={p.mood} />
        </div>
        <p className="text-sm text-gray-600">{new Date(p.created_at).toLocaleString()}</p>
        <p className="text-sm text-gray-600">{p.track_count} tracks</p>
      </div>
    </a>
  )}
