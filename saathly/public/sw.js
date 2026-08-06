const CACHE = "rizn-shell-v1";
const SHELL = ["/", "/manifest.webmanifest", "/logo.svg", "/logo.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone();
        if (res.ok && (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/images/") || SHELL.includes(url.pathname))) {
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request).then((hit) => hit || caches.match("/")))
  );
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "RIZN";
  const body = data.body || "Your personalized pulse is ready.";
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/logo.png",
      badge: "/logo.svg",
      data: { url: data.url || "/dashboard" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/dashboard";
  event.waitUntil(clients.openWindow(url));
});
