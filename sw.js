/* VG800 MIDI Control — offline service worker.
   Strategy: stale-while-revalidate everywhere. The app is one big static HTML file
   with no API calls, so serving the cached copy instantly and refreshing it in the
   background gives an instant launch that still picks up every deploy. */

const CACHE = 'vg800-v1';

/* Cached up front so "Add to Home Screen" then going offline works on the first launch,
   without ever having opened those files. Paths are relative — the app is served from a
   GitHub Pages subpath, so absolute ones would resolve to the wrong origin root. */
const SHELL = [
  './',
  './index.html',
  './vg800-tuner.html',
  './favicon.svg',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './presets/royClassic.tsl',
  './presets/royPanning.tsl',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    /* Individually, so one 404 can't fail the whole install the way addAll() would. */
    await Promise.all(SHELL.map(url => cache.add(url).catch(() => {})));
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'skip-waiting') self.skipWaiting();
});

/* A deploy changes vg800-tuner.html but not sw.js, so the usual "waiting worker" signal
   never fires. Compare the document's validator instead and tell open pages directly. */
function stamp(res) {
  return res.headers.get('etag') || res.headers.get('last-modified') || '';
}

async function announceUpdate() {
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach(c => c.postMessage({ type: 'update-ready' }));
}

async function staleWhileRevalidate(req, isDoc) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req, { ignoreSearch: isDoc });

  const network = fetch(req).then(res => {
    if (res && (res.ok || res.type === 'opaque')) {
      const copy = res.clone();
      cache.put(req, copy).catch(() => {});
      if (isDoc && cached && stamp(cached) && stamp(res) && stamp(cached) !== stamp(res)) {
        announceUpdate();
      }
    }
    return res;
  }).catch(() => null);

  if (cached) return cached;

  const fresh = await network;
  if (fresh) return fresh;

  /* Offline and never seen this URL — a navigation still deserves the app, not a browser error. */
  if (isDoc) {
    const shell = await cache.match('./vg800-tuner.html');
    if (shell) return shell;
  }
  return Response.error();
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isFont) return;

  e.respondWith(staleWhileRevalidate(req, req.mode === 'navigate'));
});
