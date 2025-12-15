export type MoodKey = 'happy' | 'calm' | 'sad' | 'energetic' | 'focus' | string

export interface UserMe {
  id: string
  display_name: string
  avatar_url?: string
}

export interface Track {
  id: string
  name: string
  artists: string[]
  album: string
  cover_url?: string
  preview_url?: string
  uri?: string
}

export interface GenerateResponse {
  playlist_url: string
  playlist_name: string
}
