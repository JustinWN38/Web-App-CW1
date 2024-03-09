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
  "Images/icon2.png"
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
/*
self.addEventListener('fetch', function (e) {
	e.respondWith(
		// check if the cache has the file
		caches.match(e.request).then(function (r) {
			console.log('[Service Worker] Fetching resource: ' + e.request.url);
	// 'r' is the matching file if it exists in the cache
	return r
		})
	);
});
*/
self.addEventListener("fetch", function (e) {
	e.respondWith(
		caches.match(e.request).then(function (cachedFile) {
			//if the file is in the cache, retrieve it from there
			if (cachedFile) {
				console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
				return cachedFile;
			} else {//if the file is not in the cache, download the file
				return fetch(e.request).then(function (response) {
					return caches.open(cacheName).then(function (cache) {
						//add the new file to the cache
						cache.put(e.request, response.clone());
						console.log("[Service Worker] Resource fetched and saved in the cache for: " +
							e.request.url);
						return response;
					});
				});
			}
		})
	);
});