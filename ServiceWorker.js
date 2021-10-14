const CACHE_NAME = 'v1_cache_contador_app_vue';
const urlsToCache = [
  './',
  './img/favicon.png',
  './img/icon32.png',
  './img/icon64.png',
  './img/icon128.png',
  './img/icon256.png',
  './img/icon512.png',
  './img/icon1024.png',
  'https://unpkg.com/vue@next',
  './js/main.js',
  './css/style.css',
  'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.error(error))
  );
});

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.includes(cacheName))
              return caches.delete(cacheName);
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caces.match(e.request).then(response => {
      if (response) return response;
      return fetch(e.request);
    })
  );
});
