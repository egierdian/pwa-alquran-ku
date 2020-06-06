importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
}
else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/surah.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/preloader.js', revision: '1' },
    { url: '/images/icon.png', revision: '1' },
    { url: '/images/48x48.png', revision: '1' },
    { url: '/images/96x96.png', revision: '1' },
    { url: '/images/192x192.png', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('https://api.quran.sutanlab.id/surah/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'alquran-apps',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
    })
);

