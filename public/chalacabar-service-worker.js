const cacheName = 'chalaca'
const filesToCache = ['/css/style.css', '/img/logo/logo-2019-white-transparent.png']
self.addEventListener('install', function(e) {
  fetch('https://chalacabar.com.br/api/install', { method: 'POST' })
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.add(new Request('/', { redirect: 'follow' }))
      cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => response || fetch(event.request))
  )
})

self.addEventListener('sync', function(e) {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)))
})
