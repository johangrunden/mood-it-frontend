export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string
export const SPOTIFY_SCOPES = (import.meta.env.VITE_SPOTIFY_SCOPES as string)
  || 'user-library-read playlist-modify-public playlist-modify-private'
export const ENABLE_MOCKS = (import.meta.env.VITE_ENABLE_MOCKS === 'true')

export const ENDPOINTS = {
  authStart: '/auth/login',
  me: '/me',
  moodTracks: '/mood-tracks',
  allLiked: '/all-liked-tracks',
  generate: '/playlist/generate'
} as const

export const MOODS = [
  { key: 'happy', label: 'Happy', emoji: '😊' },
  { key: 'calm', label: 'Calm', emoji: '😌' },
  { key: 'sad', label: 'Sad', emoji: '😢' },
  { key: 'energetic', label: 'Energetic', emoji: '⚡' },
  { key: 'focus', label: 'Focus', emoji: '🎯' }
] as const
