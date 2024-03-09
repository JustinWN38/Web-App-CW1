const staticLessonShop = "Lesson Shop"
var cacheName = "LessonShop";
var cacheFiles = [
  "index.html",
  // "products.js", // Uncomment this line if you have a products.js file
  "Images/Networking.png",
  "Images/Neurology.png",
  "Images/Physics.png",
  "Images/Biology.png",
  "Images/Chemistry.png",
  "Images/Computer.png",
  "Images/Drama.png",
  "Images/English.png",
  "Images/Games.png",
  "Images/Maths.png",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticLessonShop).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
	  caches.match(fetchEvent.request).then(res => {
		return res || fetch(fetchEvent.request)
	  })
	)
  });

  if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
	  navigator.serviceWorker
		.register("/serviceWorker.js")
		.then(res => console.log("service worker registered"))
		.catch(err => console.log("service worker not registered", err))
	})
  }
