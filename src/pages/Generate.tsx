import { useMutation } from '@tanstack/react-query'
import MoodPicker from '@/components/MoodPicker'
import { Button } from '@/components/Button'
import { api } from '@/lib/api'
import { ENDPOINTS } from '@/config'
import type { GenerateRequest, GenerateResponse, MoodKey } from '@/types'
import { useState } from 'react'

export default function Generate() {
  const [mood, setMood] = useState<MoodKey>('happy')
  const [name, setName] = useState<string>('Mood It')
  const [isPublic, setIsPublic] = useState<boolean>(false)

  const mutation = useMutation({
    mutationFn: async (payload: GenerateRequest) => {
      const res = await api.post<GenerateResponse>(ENDPOINTS.generate, payload)
      return res.data
    }
  })

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Pick a mood</h1>
      <MoodPicker value={mood} onChange={setMood} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <div className="mb-1 text-sm font-medium">Playlist name</div>
          <input className="w-full rounded-xl border p-2" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          <span>Make playlist public</span>
        </label>
      </div>

      <Button disabled={mutation.isPending} onClick={() => mutation.mutate({ mood, name, is_public: isPublic })}>
        {mutation.isPending ? 'Generating…' : 'Generate playlist'}
      </Button>

      {mutation.isSuccess && (
        <div className="rounded-2xl border bg-white p-4">
          <p className="mb-2 font-medium">Done!</p>
          <a className="underline" href={mutation.data.playlist.url} target="_blank" rel="noreferrer">
            Open playlist on Spotify
          </a>
        </div>
      )}

      {mutation.isError && (
        <p className="text-red-600">Something went wrong. Check the API base URL and endpoints.</p>
      )}
    </section>
  )
}
