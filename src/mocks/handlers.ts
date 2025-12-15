import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { Track } from '@/types'

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }
function jsonResponse<T>(config: AxiosRequestConfig, data: T, status = 200): AxiosResponse<T> {
  return { data, status, statusText: 'OK', headers: {}, config }
}

// Track pool with mood tags
type MoodKey = 'happy' | 'calm' | 'sad' | 'energetic' | 'focus'
type PoolItem = Track & { moods: MoodKey[] }

const POOL: PoolItem[] = [
  { id: 'h1', name: 'Sunny Vibes', artists: ['Glass Palms'], album: 'Daylight', cover_url: 'https://picsum.photos/seed/h1/300/300', uri: 'spotify:track:h1', preview_url: '', moods: ['happy','energetic'] },
  { id: 'h2', name: 'Smiling Streets', artists: ['Nova Drive'], album: 'Uplift', cover_url: 'https://picsum.photos/seed/h2/300/300', uri: 'spotify:track:h2', preview_url: '', moods: ['happy'] },
  { id: 'h3', name: 'Good Times', artists: ['The Weekenders'], album: 'Weekend', cover_url: 'https://picsum.photos/seed/h3/300/300', uri: 'spotify:track:h3', preview_url: '', moods: ['happy'] },
  { id: 'h4', name: 'Golden Hour', artists: ['City Echo'], album: 'Neon Sun', cover_url: 'https://picsum.photos/seed/h4/300/300', uri: 'spotify:track:h4', preview_url: '', moods: ['happy','calm'] },
  { id: 'e1', name: 'Pulse Runner', artists: ['Voltline'], album: 'Fast Lane', cover_url: 'https://picsum.photos/seed/e1/300/300', uri: 'spotify:track:e1', preview_url: '', moods: ['energetic'] },
  { id: 'e2', name: 'Firestarter', artists: ['Ignite'], album: 'Combust', cover_url: 'https://picsum.photos/seed/e2/300/300', uri: 'spotify:track:e2', preview_url: '', moods: ['energetic','happy'] },
  { id: 'e3', name: 'Night Drive', artists: ['Turbo City'], album: 'After Dark', cover_url: 'https://picsum.photos/seed/e3/300/300', uri: 'spotify:track:e3', preview_url: '', moods: ['energetic'] },
  { id: 'f1', name: 'Deep Focus', artists: ['Loft Beats'], album: 'Work Mode', cover_url: 'https://picsum.photos/seed/f1/300/300', uri: 'spotify:track:f1', preview_url: '', moods: ['focus','calm'] },
  { id: 'f2', name: 'Code Flow', artists: ['Binary Bloom'], album: 'Terminal', cover_url: 'https://picsum.photos/seed/f2/300/300', uri: 'spotify:track:f2', preview_url: '', moods: ['focus'] },
  { id: 'f3', name: 'Quiet Engines', artists: ['Aperture'], album: 'Analog', cover_url: 'https://picsum.photos/seed/f3/300/300', uri: 'spotify:track:f3', preview_url: '', moods: ['focus'] },
  { id: 'c1', name: 'Calm Waters', artists: ['Ocean State'], album: 'Blue Hour', cover_url: 'https://picsum.photos/seed/c1/300/300', uri: 'spotify:track:c1', preview_url: '', moods: ['calm'] },
  { id: 'c2', name: 'Mellow Lines', artists: ['Soft Phase'], album: 'Feather', cover_url: 'https://picsum.photos/seed/c2/300/300', uri: 'spotify:track:c2', preview_url: '', moods: ['calm','focus'] },
  { id: 'c3', name: 'Late Night Tea', artists: ['Kettle'], album: 'Rainy Windows', cover_url: 'https://picsum.photos/seed/c3/300/300', uri: 'spotify:track:c3', preview_url: '', moods: ['calm'] },
  { id: 's1', name: 'Blue Echo', artists: ['Velvet Rain'], album: 'Pale Lights', cover_url: 'https://picsum.photos/seed/s1/300/300', uri: 'spotify:track:s1', preview_url: '', moods: ['sad'] },
  { id: 's2', name: 'Grey Skies', artists: ['Nimbus'], album: 'Weathered', cover_url: 'https://picsum.photos/seed/s2/300/300', uri: 'spotify:track:s2', preview_url: '', moods: ['sad','calm'] },
  { id: 's3', name: 'Faded Letters', artists: ['Paper Rooms'], album: 'Dust', cover_url: 'https://picsum.photos/seed/s3/300/300', uri: 'spotify:track:s3', preview_url: '', moods: ['sad'] },
  { id: 'mix1', name: 'Cruise Control', artists: ['Night Shift'], album: 'Midnight Lines', cover_url: 'https://picsum.photos/seed/mix1/300/300', uri: 'spotify:track:mix1', preview_url: '', moods: ['happy','focus'] },
  { id: 'mix2', name: 'Skyline', artists: ['Highrise'], album: 'Parallax', cover_url: 'https://picsum.photos/seed/mix2/300/300', uri: 'spotify:track:mix2', preview_url: '', moods: ['energetic','focus'] },
  { id: 'mix3', name: 'Monochrome', artists: ['Grayscale'], album: 'Panels', cover_url: 'https://picsum.photos/seed/mix3/300/300', uri: 'spotify:track:mix3', preview_url: '', moods: ['sad','focus'] },
  { id: 'mix4', name: 'Soft Clouds', artists: ['Stratus'], album: 'Overcast', cover_url: 'https://picsum.photos/seed/mix4/300/300', uri: 'spotify:track:mix4', preview_url: '', moods: ['calm','happy'] },
  { id: 'mix5', name: 'Kickstart', artists: ['Twin Turbo'], album: 'RPM', cover_url: 'https://picsum.photos/seed/mix5/300/300', uri: 'spotify:track:mix5', preview_url: '', moods: ['energetic'] },
  { id: 'mix6', name: 'Daydream', artists: ['Neon Meadow'], album: 'Meadow', cover_url: 'https://picsum.photos/seed/mix6/300/300', uri: 'spotify:track:mix6', preview_url: '', moods: ['happy','calm'] },
  { id: 'mix7', name: 'Focus Grid', artists: ['Array'], album: 'Data Lines', cover_url: 'https://picsum.photos/seed/mix7/300/300', uri: 'spotify:track:mix7', preview_url: '', moods: ['focus'] },
  { id: 'mix8', name: 'Echoes', artists: ['Satellite'], album: 'Low Orbit', cover_url: 'https://picsum.photos/seed/mix8/300/300', uri: 'spotify:track:mix8', preview_url: '', moods: ['sad','calm'] },
  { id: 'mix9', name: 'Sunlit', artists: ['Atlas Avenue'], album: 'Window Seat', cover_url: 'https://picsum.photos/seed/mix9/300/300', uri: 'spotify:track:mix9', preview_url: '', moods: ['happy'] },
  { id: 'mix10', name: 'Momentum', artists: ['Vector'], album: 'Motion', cover_url: 'https://picsum.photos/seed/mix10/300/300', uri: 'spotify:track:mix10', preview_url: '', moods: ['energetic','happy'] },
  { id: 'mix11', name: 'Still Water', artists: ['Quiet Lake'], album: 'Reflections', cover_url: 'https://picsum.photos/seed/mix11/300/300', uri: 'spotify:track:mix11', preview_url: '', moods: ['calm'] },
  { id: 'mix12', name: 'Night Study', artists: ['Lamp Light'], album: 'Library', cover_url: 'https://picsum.photos/seed/mix12/300/300', uri: 'spotify:track:mix12', preview_url: '', moods: ['focus','calm'] },
  { id: 'mix13', name: 'After Rain', artists: ['City Trees'], album: 'Cobbles', cover_url: 'https://picsum.photos/seed/mix13/300/300', uri: 'spotify:track:mix13', preview_url: '', moods: ['sad','happy'] }
]

function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5; h >>>= 0
    const j = h % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickByMood(mood: string, limit = 18): Track[] {
  const m = String(mood).toLowerCase() as MoodKey
  const matches = POOL.filter(t => t.moods.includes(m))
  const others = POOL.filter(t => !t.moods.includes(m))
  const ordered = seededShuffle(matches, m).concat(seededShuffle(others, m + '-extra'))
  return ordered.slice(0, limit).map(({ moods, ...t }) => t)
}

function allLiked(limit = 32): Track[] {
  const seed = new Date().toISOString().slice(0,10)
  return seededShuffle(POOL, seed).slice(0, limit).map(({ moods, ...t }) => t)
}

let lastMood: string | null = null

export async function handleMock(config: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
  await sleep(200)
  const method = (config.method || 'get').toLowerCase()
  const url = (config.url || '')
  const path = url.replace(/^https?:\/\/[^/]+/, '')

  if (method === 'get' && path.endsWith('/me')) {
    return jsonResponse(config, { id: 'mock', display_name: 'Mocked Listener', avatar_url: '' })
  }

  if (method === 'get' && path.endsWith('/auth/login')) {
    return jsonResponse(config, { url: '/mood' } as any)
  }

  if (method === 'get' && path.startsWith('/mood-tracks')) {
    const p: any = (config as any).params || {}
    let moodParam: string | null = typeof p.mood === 'string' ? p.mood : null
    if (!moodParam) {
      const qsStr = path.includes('?') ? path.split('?')[1] : ''
      const qs = new URLSearchParams(qsStr)
      moodParam = qs.get('mood')
    }
    lastMood = (moodParam || 'happy').toLowerCase()
    return jsonResponse(config, { tracks: pickByMood(lastMood) })
  }

  if (method === 'get' && path.endsWith('/all-liked-tracks')) {
    return jsonResponse(config, { tracks: allLiked() })
  }

  if (method === 'post' && path.endsWith('/playlist/generate')) {
    return jsonResponse(config, { playlist_url: 'https://open.spotify.com/playlist/mock', playlist_name: `Mood It – ${lastMood || 'happy'}` })
  }

  return undefined
}
