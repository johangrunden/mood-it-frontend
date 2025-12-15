import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '@/state/auth'
import { ENDPOINTS } from '@/config'
import { api } from '@/lib/api'

export default function LoginCallback() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      useAuthStore.getState().setToken(token)
    }
    api.get(ENDPOINTS.me, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then((res) => {
        useAuthStore.getState().setUser(res.data)
        navigate('/generate')
      })
      .catch(() => navigate('/'))
  }, [params, navigate])

  return <p>Signing you in…</p>
}
