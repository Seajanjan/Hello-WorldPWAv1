var cacheName = 'Hello-WorldPWAv1.0';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  self.clients.claim();
});

/* Serve cached content when offline */
self.addEventListener('fetch', async(e) {
const req = e.request;
                      const url = new URL(req.url);
if (url.origin == location.origin)  {
     e.respondWith(cacheFirst(req));
} else {
  e.respondWith(networkAndCache(req));
    }
});



