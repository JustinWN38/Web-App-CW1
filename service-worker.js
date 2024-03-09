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

self.addEventListener("install", function (e) {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("[Service Worker] Caching files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            cache.put(e.request, response.clone());
            console.log(
              "[Service Worker] Resource fetched and saved in the cache for: " +
                e.request.url
            );
            return response;
          });
        })
      );
    })
  );
});
