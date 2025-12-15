import { create } from 'zustand'
import type { UserMe } from '@/types'

type AuthState = {
  token: string | null
  user: UserMe | null
  setToken: (t: string | null) => void
  setUser: (u: UserMe | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (t) => set({ token: t }),
  setUser: (u) => set({ user: u }),
  logout: () => set({ token: null, user: null })
}))
