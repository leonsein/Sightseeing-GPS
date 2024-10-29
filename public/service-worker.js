self.addEventListener("install", function(event) {
    console.log("Service Worker instalado");
  });
  
  self.addEventListener("push", function(event) {
    const data = event.data.json();
    console.log("Notificación recibida:", data);
  
    const options = {
      body: data.body,
      icon: "/icon.png",
      vibrate: [100, 50, 100],
      data: { primaryKey: data.id }
    };
  
    event.waitUntil(self.registration.showNotification(data.title, options));
  });
  