importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if(workbox)
  console.log('Workbox berhasil dimuat');
else
  console.log('Workbox gagal dimuat');

workbox.precaching.precacheAndRoute([
  {url: '/manifest.json', revision: '1'},
  {url: '/index.js', revision: '1'},
  {url: '/index.html', revision: '1'},
  {url: '/views/nav.html', revision: '1'},
  {url: '/assets/fonts/Roboto-Medium.ttf', revision: '1'},
  {url: '/assets/fonts/MeriendaOne-Regular.ttf', revision: '1'},
  {url: '/assets/fonts/MaterialIcons-Regular.woff2', revision: '1'},
  {url: '/assets/fonts/MaterialIcons-Regular.woff', revision: '1'},
  {url: '/assets/fonts/MaterialIcons-Regular.ttf', revision: '1'},
  {url: '/assets/animations/19901-football.json', revision: '1'},
  {url: '/assets/animations/lf20_MAezux.json', revision: '1'},
  {url: '/assets/images/icon-phone.png', revision: '1'},
  {url: '/assets/images/icon-72x72.png', revision: '1'},
  {url: '/assets/images/icon-96x96.png', revision: '1'},
  {url: '/assets/images/icon-128x128.png', revision: '1'},
  {url: '/assets/images/icon-144x144.png', revision: '1'},
  {url: '/assets/images/icon-152x152.png', revision: '1'},
  {url: '/assets/images/icon-192x192.png', revision: '1'},
  {url: '/assets/images/icon-384x384.png', revision: '1'},
  {url: '/assets/images/icon-512x512.png', revision: '1'},
]);
  
workbox.routing.registerRoute(
  /\/pages\//g,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages-cache',
  })
);

workbox.routing.registerRoute(
  /\.(?:css|js|png|jpg|svg|gif)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'assets-cache',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-cache',
  })
);

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
