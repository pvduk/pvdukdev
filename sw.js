/**
 * ═════════════════════════════════════════════════════════════════════
 * COSTAR PWA SERVICE WORKER · VANILLA ES2026
 * Offline-First App Shell & Stale-While-Revalidate Engine
 * ═════════════════════════════════════════════════════════════════════
 */

const CACHE_VERSION = 'pvdukdev-v2.3.0';
const CACHE_NAME = `costar-pwa-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './roadmap-requisitos.html',
  './404.html',
  './blog/index.html',
  './blog/posts/TEMPLATE.html',
  './blog/posts/2025-01-anatomia-do-cache-o-navegador.html',
  './data/posts.json',
  './manifest.webmanifest',
  './css/base.css',
  './css/components.css',
  './css/pages/home.css',
  './css/pages/roadmap.css',
  './blog/css/blog.css',
  './js/app.js',
  './blog/js/blog.js',
  './js/translations/pt.js',
  './js/translations/en.js',
  './assets/fonts/inter-latin.woff2',
  './assets/fonts/jetbrains-mono-latin.woff2',
  './assets/logo.svg',
  './assets/og-image.svg',
  './assets/og-image.png',
  './assets/pwa-icon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// 1. Instalação: Pre-cache de todos os recursos essenciais (App Shell)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 2. Ativação: Limpeza atômica de caches legados
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name.startsWith('costar-pwa-')) {
            return caches.delete(name);
          }
          return null;
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Interceptação de Requisições com Estratégia Híbrida
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Requisições que não sejam GET (ex: POST de formulário de contato) não são cacheadas
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Requisições externas à API do Web3Forms não passam pelo cache
  if (url.origin !== self.location.origin) {
    return;
  }

  // Navegação HTML: Network-First com Fallback para Cache
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // Assets Estáticos (CSS, JS, SVGs, Imagens): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
