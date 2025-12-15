import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ENDPOINTS } from '@/config'
import { TrackList } from '@/components/TrackList'
import type { Track } from '@/types'

export default function AllLiked() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['all-liked-tracks'],
    queryFn: async (): Promise<Track[]> => {
      const res = await api.get<{ tracks: Track[] }>(ENDPOINTS.allLiked)
      return res.data.tracks
    }
  })

  if (isLoading) return <p>Loading…</p>
  if (isError) return <p className="text-red-400">Could not load liked tracks.</p>

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">All liked tracks</h1>
      <TrackList tracks={data ?? []} />
    </section>
  )
}
