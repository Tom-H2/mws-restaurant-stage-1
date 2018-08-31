self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/css/responsive-styles.css',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/img',
        '/js/dhbhelper.js'
      ]);
    })
  );
});
