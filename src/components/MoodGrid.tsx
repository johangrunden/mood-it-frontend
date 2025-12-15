import { MOODS } from '@/config'
import type { MoodKey } from '@/types'

export function MoodGrid({ value, onChange }: { value?: MoodKey | null, onChange: (m: MoodKey) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {MOODS.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`rounded-xl border border-white/10 bg-spotify-dark p-4 text-left hover:border-white/20 ${value === m.key ? 'ring-2 ring-spotify-green' : ''}`}
        >
          <div className="text-2xl">{m.emoji}</div>
          <div className="mt-1 font-semibold">{m.label}</div>
        </button>
      ))}
    </div>
  )
}
