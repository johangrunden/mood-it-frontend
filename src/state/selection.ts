import { create } from 'zustand'
import type { MoodKey, Track } from '@/types'

type SelectionState = {
  mood: MoodKey | null
  tracks: Track[]
  setMood: (m: MoodKey) => void
  setTracks: (t: Track[]) => void
  reset: () => void
}

export const useSelection = create<SelectionState>((set) => ({
  mood: null,
  tracks: [],
  setMood: (m) => set({ mood: m }),
  setTracks: (t) => set({ tracks: t }),
  reset: () => set({ mood: null, tracks: [] })
}))
