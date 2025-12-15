import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/state/auth'

export function useAuthGuard() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  useEffect(() => {
    if (!user) navigate('/')
  }, [user, navigate])
}
