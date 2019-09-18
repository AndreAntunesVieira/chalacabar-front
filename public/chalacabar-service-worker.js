const cacheName = 'chalacabar'
const filesToCache = ['/css/style.css', '/img/logo/logo-2019-white-transparent.webp']
self.addEventListener('install', e => {
  fetch('https://chalacabar.com.br/api/install', { method: 'POST' })
  fetch('https://chalacabar.com.br/.act/install')
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.delete('/')
      cache.add(new Request('/', { redirect: 'follow' }))
      cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))))
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => response || fetch(event.request))
  )
})

self.addEventListener('sync', e => {
  fetch('https://chalacabar.com.br/.act/sync')
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)))
})
