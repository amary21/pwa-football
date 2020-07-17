const { assets } = global.serviceWorkerOption

const CACHE_NAME = "football-pwa-v1"

let urlsToCache = [
  ...assets, 
  './',
  './manifest.json',
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
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
          return fetch(event.request).then(response =>{
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        })
      )
    }
});

self.addEventListener("activate", event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName != CACHE_NAME && cacheName.startsWith("football-pwa")) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});
  