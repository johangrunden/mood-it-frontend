import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { MoodGrid } from '@/components/MoodGrid'
import { Button } from '@/components/Button'
import { api } from '@/lib/api'
import { ENDPOINTS } from '@/config'
import type { MoodKey, Track } from '@/types'
import { useSelection } from '@/state/selection'
import { useState } from 'react'

export default function Mood() {
  const [mood, setMood] = useState<MoodKey>('happy')
  const nav = useNavigate()
  const setTracks = useSelection((s) => s.setTracks)
  const setMoodState = useSelection((s) => s.setMood)

  const fetchRecs = useMutation({
    mutationFn: async (m: MoodKey) => {
  const res = await api.get(ENDPOINTS.moodTracks, { params: { mood: m } })
  return res.data.tracks
    },
    onSuccess: (tracks) => {
      setMoodState(mood)
      setTracks(tracks)
      nav('/review')
    }
  })

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Choose your mood</h1>
      <MoodGrid value={mood} onChange={setMood} />
      <Button disabled={fetchRecs.isPending} onClick={() => fetchRecs.mutate(mood)}>
        {fetchRecs.isPending ? 'Finding songs…' : 'Show songs'}
      </Button>
      {fetchRecs.isError && <p className="text-red-400">Could not fetch recommendations.</p>}
    </section>
  )
}
