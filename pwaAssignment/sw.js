const filesToCache = [
  './index.html',
  'css/style.css',
  'js/main.js',
  'images/hello-icon-128.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open('v1');
        return cache.addAll(filesToCache);
      } catch (e) {
        console.log(e.message);
      }
    })()
  );
});

self.addEventListener('fetch', event => {
  console.log('ServiceWorker Fetch', event.request.url);
  event.respondWith(
    (async () => {
      try {
        const response = await caches.match(event.request);
        return response || fetch(event.request);
      } catch (e) {
        console.log(e.message);
      }
    })()
  );
});
