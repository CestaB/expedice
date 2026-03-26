/* Expedice Camper — Service Worker v7.7 */
const CACHE = 'expedice-v7';
const SHELL = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname !== location.hostname) return;

  // Network-first pro HTML — vždy zkus načíst čerstvou verzi ze serveru.
  // Pokud síť selže (offline), použij cache jako zálohu.
  if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/expedice/') || url.pathname.endsWith('/expedice')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Ulož čerstvou verzi do cache
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first pro ostatní soubory (manifest, ikony…)
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
