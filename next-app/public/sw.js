const CACHE_NAME = 'anhart-v3'; // Incremented version to force cache refresh
const STATIC_CACHE_URLS = [
  '/images/anhart-logo.png',
  '/images/anhart-logo-white.png'
];

// URLs that should NEVER be cached (always fetch fresh)
// IMPORTANT: JavaScript files must NEVER be cached to prevent stale code issues
const NO_CACHE_PATTERNS = [
  /\/api\//,
  /challenges\.cloudflare\.com/,
  /turnstile/,
  /supabase/,
  /\.json$/,
  /\/contact/,
  /\/Merritt\/contact/,
  /\/portfolio/,
  /\/admin/,
  /\.js$/i,  // NEVER cache JavaScript files - prevents stale code issues
  /\/_next\/static\/chunks\//,  // NEVER cache JS chunks - they contain env vars
  /\/_next\/static\/.*\.js$/i,  // NEVER cache any _next JS files
];

// URLs that are safe to cache (static assets only - NO JAVASCRIPT)
// Only cache truly static assets that don't change between deployments
const STATIC_PATTERNS = [
  /\/images\//,
  /\/assets\//,
  /\/_next\/static\/css\//,  // CSS is safe to cache (content-hashed)
  /\/_next\/static\/media\//,  // Media files are safe to cache
  /\.(png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|css|mp4|webm)$/i,  // Note: NO .js here
];

// Check if URL should never be cached
function shouldNeverCache(url) {
  return NO_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

// Check if URL is a static asset (excludes JavaScript files)
function isStaticAsset(url) {
  // NEVER cache JavaScript files - they contain environment variables
  if (/\.js($|\?)/i.test(url)) {
    return false;
  }
  // NEVER cache _next chunks - they contain business logic
  if (/_next\/static\/chunks\//i.test(url)) {
    return false;
  }
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

// Activate event - clean up old caches AND force all clients to use new SW immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete ALL old caches (more aggressive cleanup)
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          // Also clean the current cache of any JS files that might have slipped in
          return caches.open(CACHE_NAME).then((cache) => {
            return cache.keys().then((requests) => {
              return Promise.all(
                requests.map((request) => {
                  // Remove any cached JS files
                  if (/\.js($|\?)/i.test(request.url) || /_next\/static\/chunks\//i.test(request.url)) {
                    console.log('Removing cached JS file:', request.url);
                    return cache.delete(request);
                  }
                })
              );
            });
          });
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      console.log('Service worker activated, taking control of all clients');
      return self.clients.claim();
    })
  );
});
