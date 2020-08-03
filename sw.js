const CACHE_NAME = "football-pwa-v1";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/index.js",
  "/index.html",
  "/views/nav.html",
  "/pages/favorite.html",
  "/pages/home.html",
  "/pages/standings.html",
  "/pages/detail.html",
  "/styles/main.css",
  "/styles/material-design.css",
  "/scripts/main.js",
  "/scripts/api.js",
  "/scripts/service.js",
  "/scripts/item.js",
  "/scripts/url.js",
  "/scripts/db.js",
  "/scripts/components/matchday.js",
  "/scripts/components/standings.js",
  "/scripts/components/detail.js",
  "/scripts/components/favorite.js",
  "/scripts/components/animation.js",
  "/library/css/materialize.min.css",
  "/library/js/materialize.min.js",
  "/library/js/lottie-player.js",
  "/library/js/idb.js",
  "/assets/fonts/Roboto-Medium.ttf",
  "/assets/fonts/MeriendaOne-Regular.ttf",
  "/assets/fonts/MaterialIcons-Regular.woff2",
  "/assets/fonts/MaterialIcons-Regular.woff",
  "/assets/fonts/MaterialIcons-Regular.ttf",
  "/assets/animations/19901-football.json",
  "/assets/animations/lf20_MAezux.json",
  "/assets/images/icon-phone.png",
  "/assets/images/icon-72x72.png",
  "/assets/images/icon-96x96.png",
  "/assets/images/icon-128x128.png",
  "/assets/images/icon-144x144.png",
  "/assets/images/icon-152x152.png",
  "/assets/images/icon-192x192.png",
  "/assets/images/icon-384x384.png",
  "/assets/images/icon-512x512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache)
        })
    );
});

self.addEventListener("fetch", event => {
    let base_url = "https://api.football-data.org/v2/";
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
        caches.match(event.request, { ignoreSearch: true }).then(response => {
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
            if (cacheName != CACHE_NAME && cacheName.startsWith("football-pwa2")) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});

self.addEventListener("push", event =>{
  let body;
  if(event.data){
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }

  const options = {
    body: body,
    icon: "/assets/images/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Push Notfication', options)
  );
});
  