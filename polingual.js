const CACHE_NAME = 'fluent-ai-v1';
const ASSETS = [
  '/',
  '/polingual.html',
  '/polingual.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  // Aplikasi AI membutuhkan internet untuk API Gemini
  // Jadi kita gunakan strategi Network First, fall back to cache
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
