import fallbackCover from '@/assets/cover-fallback.svg'
import type { Track } from '@/types'

export function TrackRow({ t, index }: { t: Track, index: number }) {
  return (
    <div className="grid grid-cols-[40px,56px,1fr] items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
      <div className="text-white/60">{index + 1}</div>
      {t.cover_url ? (
        <img className="h-14 w-14 rounded object-cover" src={t.cover_url || fallbackCover} alt="" onError={(e)=>{(e.currentTarget as HTMLImageElement).src = fallbackCover}} />
      ) : (
        <div className="grid h-14 w-14 place-items-center rounded bg-white/5">🎵</div>
      )}
      <div className="min-w-0">
        <div className="truncate font-medium">{t.name}</div>
        <div className="truncate text-sm text-white/60">{t.artists.join(', ')} • {t.album}</div>
      </div>
    </div>
  )
}
