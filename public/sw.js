// Simple offline-first service worker for the Hunters companion.
// Precaches the app shell on install, then serves same-origin GET requests
// cache-first (falling back to network and caching new responses). Because
// Vite fingerprints built assets, a cache-first runtime strategy keeps the
// whole app — including audio dropped into the bundle — available offline
// after the first visit.

const CACHE = 'hunters-v1'
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(request, copy))
          }
          return res
        })
        .catch(() => {
          // navigation fallback to the app shell when offline
          if (request.mode === 'navigate') return caches.match('./index.html')
          return new Response('', { status: 504, statusText: 'offline' })
        })
    }),
  )
})
