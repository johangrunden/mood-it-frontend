import { Button } from '@/components/Button'
import { TrackList } from '@/components/TrackList'
import { api } from '@/lib/api'
import { ENDPOINTS } from '@/config'
import { useSelection } from '@/state/selection'
import { useMutation } from '@tanstack/react-query'

export default function Review() {
  const { tracks, mood } = useSelection()

  const generate = useMutation({
    mutationFn: async () => {
      const res = await api.post<{ playlist_url: string, playlist_name: string }>(ENDPOINTS.generate, { mood })
      return res.data
    }
  })

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Your songs for: <span className="capitalize">{mood}</span></h1>
      <TrackList tracks={tracks} />
      <div className="flex items-center gap-4">
        <Button disabled={generate.isPending} onClick={() => generate.mutate()}>
          {generate.isPending ? 'Generating…' : 'Create playlist on Spotify'}
        </Button>
        {generate.isSuccess && (
          <a className="underline" href={generate.data.playlist_url} target="_blank" rel="noreferrer">
            Open playlist
          </a>
        )}
      </div>
      {generate.isError && <p className="text-red-400">Failed to create playlist.</p>}
    </section>
  )
}
