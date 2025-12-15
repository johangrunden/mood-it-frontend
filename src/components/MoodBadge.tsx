import { MoodKey } from '@/types'

export default function MoodBadge({ mood }: { mood: MoodKey }) {
  const colors: Record<string, string> = {
    happy: 'bg-yellow-100 text-yellow-800',
    calm: 'bg-sky-100 text-sky-800',
    sad: 'bg-blue-100 text-blue-800',
    energetic: 'bg-emerald-100 text-emerald-800',
    focus: 'bg-purple-100 text-purple-800'
  }
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[mood] ?? 'bg-gray-100 text-gray-800'}`}>{mood}</span>
}
