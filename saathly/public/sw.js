self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "RIZN";
  const body = data.body || "Your personalized pulse is ready.";
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icon.png",
      badge: "/icon.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/dashboard"));
});
