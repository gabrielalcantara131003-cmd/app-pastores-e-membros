const CACHE_NAME = 'ministerial-v15';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/data.js',
  '/bento-styles.css',
  '/lucide-watcher.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Deleção agressiva de qualquer cache que não seja o v15
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Apagando cache antigo no SW:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isCoreFile = ['/', '/index.html', '/app.js', '/styles.css'].some(path => url.pathname === path || (path === '/' && url.pathname === ''));

  if (isCoreFile) {
    // Estratégia: Network First para arquivos principais
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Estratégia: Cache First para o restante
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchRes) => {
          const responseToCache = fetchRes.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return fetchRes;
        });
      })
    );
  }
});
