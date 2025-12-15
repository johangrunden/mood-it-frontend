import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './components/Header'
import Routes from './routes'

export default function App() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header onLogoClick={() => navigate('/')} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes />
        <Outlet />
      </main>
    </div>
  )
}
