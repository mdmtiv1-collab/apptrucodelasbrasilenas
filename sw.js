// Service worker: guarda el app para usarlo sin conexión.
const VERSION = 'v4';
const CACHE = 'brasilenas-' + VERSION;
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'data.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Safari pide el video por rangos (Range): hay que responder 206 desde la caché.
async function rangeFromCache(req, res) {
  const buf = await res.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range'));
  const start = m[1] ? Number(m[1]) : 0;
  const end = m[2] ? Math.min(Number(m[2]), buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: { 'Content-Type': res.headers.get('Content-Type') || 'video/mp4', 'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`, 'Content-Length': String(end - start + 1) },
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;

  if (url.pathname.includes('/media/')) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      let res = await cache.match(url.pathname);
      if (!res) {
        const net = await fetch(url.pathname); // petición completa (sin Range) para guardarla
        if (net.ok) { await cache.put(url.pathname, net.clone()); res = net; } else return net;
      }
      return req.headers.has('range') ? rangeFromCache(req, res) : res;
    })());
    return;
  }

  // Resto: red primero (para ver cambios), y la caché si no hay conexión.
  e.respondWith(fetch(req).then((net) => {
    if (net.ok) { const copy = net.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return net;
  }).catch(() => caches.match(req).then((r) => r || caches.match('index.html'))));
});
