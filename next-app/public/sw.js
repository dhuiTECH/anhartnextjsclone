const CACHE_NAME = 'anhart-v2';
const STATIC_CACHE_URLS = [
  '/images/anhart-logo.png',
  '/images/anhart-logo-white.png'
];

// URLs that should NEVER be cached (always fetch fresh)
const NO_CACHE_PATTERNS = [
  /\/api\//,
  /challenges\.cloudflare\.com/,
  /turnstile/,
  /\.json$/,
  /\/contact/,
  /\/Merritt\/contact/,
];

// URLs that are safe to cache (static assets only)
const STATIC_PATTERNS = [
  /\/images\//,
  /\/assets\//,
  /\/_next\/static\//,
  /\.(png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|css)$/i,
];

// Check if URL should never be cached
function shouldNeverCache(url) {
  return NO_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

// Check if URL is a static asset
function isStaticAsset(url) {
  return STATIC_PATTERNS.some(pattern => pattern.test(url));
}

// Install event - cache static assets only
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Only cache truly static assets
        return cache.addAll(STATIC_CACHE_URLS.filter(url => {
          try {
            return isStaticAsset(url);
          } catch {
            return false;
          }
        }));
      })
      .catch(() => {
        // Ignore cache errors during install
      })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Fetch event - network-first for dynamic content, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // NEVER cache API calls, Turnstile, or dynamic content
  if (shouldNeverCache(url.href)) {
    event.respondWith(
      fetch(request, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        }
      }).catch(() => {
        // If network fails, return error instead of stale cache
        return new Response('Network error', { status: 503 });
      })
    );
    return;
  }

  // For static assets, try cache first, then network
  if (isStaticAsset(url.href)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          // Only cache successful responses for static assets
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // For everything else (HTML pages, etc.), use network-first
  event.respondWith(
    fetch(request, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    }).then((response) => {
      // Don't cache HTML pages or dynamic content
      return response;
    }).catch(() => {
      // If network fails, try cache as fallback
      return caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});
