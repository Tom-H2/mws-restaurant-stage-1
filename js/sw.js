self.addEventListener('install', function(event) { //the goal of this file is to call cached files
  event.waitUntil( //The code here was taken from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
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
