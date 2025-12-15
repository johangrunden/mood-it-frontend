import axios, { AxiosResponse } from 'axios'
import { API_BASE_URL, ENABLE_MOCKS } from '@/config'
import { useAuthStore } from '@/state/auth'
import { handleMock } from '@/mocks/handlers'

export const api = axios.create({ baseURL: API_BASE_URL, withCredentials: true })

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/'
    }
    return Promise.reject(err)
  }
)

if (ENABLE_MOCKS) {
  api.defaults.adapter = async (config): Promise<AxiosResponse> => {
    const mocked = await handleMock(config)
    if (mocked) return mocked
    throw new Error(`[MOCK] No mock defined for ${config.method?.toUpperCase()} ${config.url}`)
  }
}
