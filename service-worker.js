var cacheName = "LessonShop";
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
