const { assets } = global.serviceWorkerOption

const CACHE_NAME = "football-pwa-v1"

let urlsToCache = [
  ...assets, 
  "./",
  "./manifest.ba8d7f442df7c7a63831296a4a42396f.json",
  "./src/index.js",
  "./src/index.html",
  "./src/views/nav.html",
  "./src/pages/favorite.html",
  "./src/pages/home.html",
  "./src/pages/standings.html",
  "./src/pages/detail.html",
  "./src/styles/main.css",
  "./src/styles/material-design.css",
  "./src/scripts/main.js",
  "./src/scripts/api.js",
  "./src/scripts/service.js",
  "./src/scripts/item.js",
  "./src/scripts/url.js",
  "./src/scripts/db.js",
  "./src/scripts/components/matchday.js",
  "./src/scripts/components/standings.js",
  "./src/scripts/components/detail.js",
  "./src/scripts/components/favorite.js",
  "./src/scripts/components/animation.js",
  "./assets/fonts/Roboto-Medium.ttf",
  "./assets/fonts/MeriendaOne-Regular.ttf",
  "./assets/fonts/MaterialIcons-Regular.woff2",
  "./assets/fonts/MaterialIcons-Regular.woff",
  "./assets/fonts/MaterialIcons-Regular.ttf",
  "./assets/animations/19901-football.json",
  "./assets/animations/lf20_MAezux.json",
  "./assets/icons/icon-phone.png",
  "./assets/icons/icon-72x72.png",
  "./assets/icons/icon-96x96.png",
  "./assets/icons/icon-128x128.png",
  "./assets/icons/icon-144x144.png",
  "./assets/icons/icon-152x152.png",
  "./assets/icons/icon-192x192.png",
  "./assets/icons/icon-384x384.png",
  "./assets/icons/icon-512x512.png"
]

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
          if (cacheName != CACHE_NAME && cacheName.startsWith("football-pwa")) {
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
  icon: "/assets/icons/icon-72x72.png",
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
