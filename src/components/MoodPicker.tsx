import { useQuery } from '@tanstack/react-query'
import { ENDPOINTS } from '@/config'
import { api } from '@/lib/api'
import type { MoodOption, MoodKey } from '@/types'

export default function MoodPicker({ value, onChange }: { value?: MoodKey, onChange: (m: MoodKey) => void }) {
  const { data } = useQuery({
    queryKey: ['moods'],
    queryFn: async (): Promise<MoodOption[]> => {
      try {
        const res = await api.get(ENDPOINTS.moods)
        return res.data.moods as MoodOption[]
      } catch {
        return [
          { key: 'happy', label: 'Happy', emoji: '😊' },
          { key: 'calm', label: 'Calm', emoji: '😌' },
          { key: 'sad', label: 'Sad', emoji: '😢' },
          { key: 'energetic', label: 'Energetic', emoji: '⚡' },
          { key: 'focus', label: 'Focus', emoji: '🎯' }
        ]
      }
    }
  })

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
      {data?.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`rounded-2xl border bg-white p-3 text-left hover:shadow ${value === m.key ? 'ring-2 ring-black' : ''}`}
        >
          <div className="text-2xl">{m.emoji ?? '🎵'}</div>
          <div className="font-semibold">{m.label}</div>
          {m.description && <div className="text-xs text-gray-600">{m.description}</div>}
        </button>
      ))}
    </div>
  )
}
