import { useEffect } from 'react'
import { Button } from '@/components/Button'
import { API_BASE_URL, ENDPOINTS, SPOTIFY_SCOPES } from '@/config'
import { useAuthStore } from '@/state/auth'
import { api } from '@/lib/api'

export default function Home() {
  const user = useAuthStore((s) => s.user)

  const handleLogin = () => {
    const url = new URL(API_BASE_URL + ENDPOINTS.authStart)
    url.searchParams.set('scopes', SPOTIFY_SCOPES)
    window.location.href = url.toString()
  }

  useEffect(() => {
    api.get(ENDPOINTS.me)
      .then((res) => useAuthStore.getState().setUser(res.data))
      .catch(() => {})
  }, [])

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Create playlists from your liked songs by mood</h1>
      <p className="text-gray-700">Connect Spotify and pick a mood – we’ll generate a fresh playlist from your liked tracks.</p>

      {user ? (
        <div className="flex items-center gap-3">
          <Button onClick={() => (window.location.href = '/generate')}>Pick a mood</Button>
          <span className="text-sm text-gray-600">Logged in as {user.display_name}</span>
        </div>
      ) : (
        <Button onClick={handleLogin}>Continue with Spotify</Button>
      )}
    </section>
  )
}
