import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ENDPOINTS } from '@/config'
import { PlaylistCard } from '@/components/PlaylistCard'
import type { PlaylistSummary } from '@/types'

export default function History() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const res = await api.get<{ items: PlaylistSummary[] }>(ENDPOINTS.history)
      return res.data.items
    }
  })

  if (isLoading) return <p>Loading…</p>
  if (error) return <p className="text-red-600">Failed to load history.</p>

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">History</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((p) => <PlaylistCard key={p.id} p={p} />)}
      </div>
    </section>
  )
}
