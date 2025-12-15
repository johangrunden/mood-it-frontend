import type { Track } from '@/types'
import { TrackRow } from './TrackRow'

export function TrackList({ tracks }: { tracks: Track[] }) {
  return (
    <div className="divide-y divide-white/5 rounded-xl border border-white/10 bg-spotify-dark">
      {tracks.map((t, i) => <TrackRow key={t.id} t={t} index={i} />)}
    </div>
  )
}
