var cacheName = "LessonShop-v1";
var cacheFiles = [
  "index.html",
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
  "Images/icon1.png",
  "Images/icon2.png",
  "data.json"
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
        caches.match(e.request).then(function (cachedFile) {
            // If the file is in the cache, retrieve it from there
            if (cachedFile) {
                console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
                return cachedFile;
            } else {
                // If the file is not in the cache, download the file
                return fetch(e.request).then(function (response) {
                    return caches.open(cacheName).then(function (cache) {
                        // Add the new file to the cache
                        cache.put(e.request, response.clone());
                        console.log("[Service Worker] Resource fetched and saved in the cache for: " +
                            e.request.url);
                        return response;
                    });
                }).catch(function (error) {
                    console.error("[Service Worker] Fetch failed:", error);
                    // Optionally, return a custom offline page or handle the error gracefully
                    // You can customize this based on your application's needs
                    return caches.match('offline.html'); // Make sure you have an 'offline.html' in your cache
                });
            }
        })
    );
});
