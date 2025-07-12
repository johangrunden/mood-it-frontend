
const BACKEND_URL = 'http://35.228.41.54:8000';

let currentMood = null;
let filteredTracks = [];

// Redirect the user to Spotify login
function login() {
  window.location.href = `${BACKEND_URL}/login`;
}

document.addEventListener('DOMContentLoaded', checkLoginStatus);

function checkLoginStatus() {
  fetch(`${BACKEND_URL}/me`, {
    credentials: 'include'
  })
    .then(res => {
      if (!res.ok) throw new Error('Not logged in');
      return res.json();
    })
    .then(data => {
      const loginBtn = document.getElementById('login-btn');
      const greeting = document.getElementById('user-greeting');
      loginBtn.style.display = 'none';
      greeting.textContent = `Hi, ${data.display_name}`;
      greeting.style.display = 'inline';
    })
    .catch(() => {
      // Not logged in – show login button
    });
}

function showAllLiked() {
  fetch(`${BACKEND_URL}/all-liked-tracks`, {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('track-list');
      list.innerHTML = '';

      if (!Array.isArray(data) || data.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'You have no liked tracks.';
        list.appendChild(li);
        return;
      }

      data.forEach(track => {
        const li = document.createElement('li');
        li.textContent = `${track.name} — ${track.artist}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Failed to fetch liked tracks:', err);
    });
}

function selectMood(mood) {
  currentMood = mood;
  fetch(`${BACKEND_URL}/mood-tracks?mood=${mood}`, {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      updateTrackList(data);
    })
    .catch(err => {
      console.error('Error fetching mood tracks:', err);
    });
}

function updateTrackList(tracks) {
  const listEl = document.getElementById('track-list');
  listEl.innerHTML = '';
  filteredTracks = tracks;

  if (!tracks.length) {
    const li = document.createElement('li');
    li.textContent = 'No matching tracks found.';
    listEl.appendChild(li);
    return;
  }

  tracks.forEach(track => {
    const li = document.createElement('li');
    li.textContent = `${track.name} — ${track.artist}`;
    listEl.appendChild(li);
  });
}

function createPlaylist() {
  if (!currentMood || !filteredTracks.length) {
    alert('Please select a mood and wait for matching tracks.');
    return;
  }

  const uris = filteredTracks.map(t => t.uri);
  fetch(`${BACKEND_URL}/create-playlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood: currentMood, uris }),
    credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
    if (data.playlist_url) {
      window.open(data.playlist_url, '_blank');
    } else {
      alert('Error: ' + (data.error || 'Unknown error'));
    }
  });
}

