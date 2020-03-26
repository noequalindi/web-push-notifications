console.log("Service Worker Loaded...");
const urlToOpen = new URL(self.location.origin).href;

function showNotification(event) {
  return new Promise(resolve => {
    const { body, title, tag } = JSON.parse(event.data.text())

    self.registration
      .getNotifications({ tag })
      .then(() => {
        const icon = "https://cdn.almundo.com/statics/img/home/favicon/almundo-favicon.ico";
        return self.registration
          .showNotification(title, { body, tag, icon })
      })
      .then(resolve)
  })
}
self.addEventListener("push", event => {
  event.waitUntil(showNotification(event));
});

self.addEventListener("notificationclick", event => {
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
    .then((windowClients) => {
      const matchingClient = null;
      const client = windowClients.map(client => {
        if (client === urlToOpen) matchingClient = client; 
      });
      return matchingClient ? client.focus() : clients.openWindow(urlToOpen);
    })
  );
});

