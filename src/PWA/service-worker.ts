/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== 'navigate') {
      return false;
    }
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".tsx") ||
      url.pathname.endsWith(".ts") ||
      url.pathname.endsWith(".jpg") ||
      url.pathname.endsWith(".gif") ||
      url.pathname.endsWith(".png") ||
      url.pathname.endsWith(".html")),
  new StaleWhileRevalidate({
    cacheName: "cache",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);


// registerRoute(
//   ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
//   new StaleWhileRevalidate({
//     cacheName: 'images',
//     plugins: [
//       new ExpirationPlugin({ maxEntries: 50 }),
//     ],
//   })
// );

// service-worker.ts




self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});


// service-worker.js

// self.addEventListener('install', (event) => {
//   self.skipWaiting(); // Skip waiting immediately
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim());
// });

