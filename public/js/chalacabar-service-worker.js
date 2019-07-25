const cacheName = 'chalacabar'
const filesToCache = ['/css/style.css', '/img/logo/logo-2019-white-transparent.webp']
self.addEventListener('install', function(e) {
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
  fetch('https://chalacabar.com.br/.act/activate')
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.delete('/')
      self.clients.claim()
    }))
})

self.addEventListener('fetch', event => {
  if(event.request.url === '/'){
    return event.respondWith(
      caches.open(cacheName)
        .then(cache => {
          try{
            cache.delete('/')
          }
          catch(e){

          }
          return fetch(event.request)
        })
    )
  }
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => response || fetch(event.request))
  )
})

self.addEventListener('sync', e => {
  fetch('https://chalacabar.com.br/.act/sync')
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)))
})
