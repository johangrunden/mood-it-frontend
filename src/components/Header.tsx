import { useAuthStore } from '@/state/auth'

export function Header({ onLogoClick }: { onLogoClick?: () => void }) {
  const user = useAuthStore((s) => s.user)
  return (
    <header className="border-b border-white/10 bg-spotify-dark">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <button className="text-xl font-bold text-white" onClick={onLogoClick}>
            Mood It
          </button>
          <div className="flex items-center gap-3">
            
            {user ? (
              <div className="flex items-center gap-2">
                {user.avatar_url && <img alt="avatar" src={user.avatar_url} className="h-8 w-8 rounded-full" />}
                <span className="text-sm text-white/80">{user.display_name}</span>
              </div>
            ) : null}
          </div>
          <nav className="flex items-center gap-3">
            <a href="/mood" className="text-sm text-white/80 hover:text-white">Mood</a>
            <a href="/liked" className="text-sm text-white/80 hover:text-white">All liked</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
