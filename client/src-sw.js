const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route based on the provided manifest
precacheAndRoute(self.__WB_MANIFEST);

// Define caching strategy for pages using CacheFirst strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Cache responses with status 0
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set expiration time for cached pages
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up the cache for specific URLs using the pageCache strategy
// This is useful to pre-cache certain pages when the service worker is installed
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route for page navigation requests using the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching
registerRoute(
  ({ request }) => {
    console.log(request);
    return (
      // CSS
      request.destination === 'style' ||
      // JavaScript
      request.destination === 'script'
    );
  }
);
