const { assets } = global.serviceWorkerOption

const CACHE_NAME = "football-pwa-v1"

let urlsToCache = [...assets, './']

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
  