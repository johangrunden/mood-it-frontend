import { Button } from '@/components/Button'
import { API_BASE_URL, ENDPOINTS, SPOTIFY_SCOPES, ENABLE_MOCKS } from '@/config'

export default function Login() {
  const handleLogin = () => {
    if (ENABLE_MOCKS) {
      window.location.href = '/mood'
      return
    }
    if (!API_BASE_URL) {
      console.error('VITE_API_BASE_URL saknas i .env-filen.')
      alert('VITE_API_BASE_URL saknas i .env-filen.')
      return
    }
    const url = new URL(API_BASE_URL + ENDPOINTS.authStart)
    url.searchParams.set('scopes', SPOTIFY_SCOPES)
    window.location.href = url.toString()
  }

  return (
    <section className="mx-auto max-w-md space-y-6 text-center">
      <div className="mt-16 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Sign in to continue</h1>
        <p className="text-white/70">
          Use your liked songs to build mood-based playlists.
        </p>
        <Button onClick={handleLogin}>Continue with Spotify</Button>
      </div>
    </section>
  )
}
