const VERSION = 'toolkit-v1';
const CORE = [
    './',
    './index.html',
    './manifest.json',
    './apps.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-512-maskable.png',
    './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(VERSION)
            .then((cache) => cache.addAll(CORE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

async function cacheFirst(request) {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(request);
    if (cached) {
        fetch(request)
            .then((res) => { if (res && res.ok) cache.put(request, res.clone()); })
            .catch(() => {});
        return cached;
    }
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
}

async function networkFirst(request) {
    const cache = await caches.open(VERSION);
    try {
        const res = await fetch(request);
        if (res && res.ok) cache.put(request, res.clone());
        return res;
    } catch (err) {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
            const fallback = await cache.match('./index.html');
            if (fallback) return fallback;
        }
        return Response.error();
    }
}

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return;
    if (request.headers.has('apikey') || request.headers.has('authorization')) return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) {
        event.respondWith(cacheFirst(request));
        return;
    }
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }
    event.respondWith(networkFirst(request));
});
