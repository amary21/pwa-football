const { assets } = global.serviceWorkerOption

const CACHE_NAME = "football-pwa-v1"

let urlsToCache = [
  ...assets, 
  './',
  './src/views/nav.html',
  './src/pages/detail.html',
  './src/pages/favorite.html',
  './src/pages/home.html',
  './src/pages/standings.html',
  './src/styles/main.css',
  './src/styles/material-design.css',
  './src/scripts/main.js',
  './src/scripts/api.js',
  './src/scripts/service.js',
  './src/scripts/item.js',
  './src/scripts/base-url.js',
  './assets/Roboto-Medium.ttf',
  './assets/MeriendaOne-Regular.ttf',
  './assets/19901-football.json',
  './assets/MaterialIcons-Regular.woff2',
  './assets/MaterialIcons-Regular.woff',
  './assets/MaterialIcons-Regular.ttf'
]

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache)
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(response => {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});
  