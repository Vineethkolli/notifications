self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Notification", {
    body: data.body || "You have a new notification.",
    icon: data.icon || "./vite.svg",
    badge: data.badge || "./vite.svg", // Optional: Badge for iOS
    data: data.url || "/", // Optional: To navigate upon clicking
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Navigate to the URL if provided
  if (event.notification.data) {
    event.waitUntil(clients.openWindow(event.notification.data));
  }
});
