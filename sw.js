let CACHE_VERSION = 'v1';
let CACHE_FILES = [ //this array lists files for caching
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/responsive-styles.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img',
    '/js/dbhelper.js'
  ];

self.addEventListener('install', function(event) { //the goal of this file is to call cached files
  event.waitUntil( //The code here was taken from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
    caches.open(CACHE_VERSION).then(function(cache) {
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener('activate', function(e) {
 console.log('Activating new service worker');

 e.waitUntil(
   caches.keys().then(function(cacheNames) {
     return Promise.all(
     cacheNames.filter(function(cacheName) {
        return cacheName.startsWith('') && cacheName !== CACHE_VERSION;
         }).map(function(cacheName){
            return caches.delete(cacheName);
           })
        );
   })
 );
});

self.addEventListener('fetch', function (event) { //for this code I used https://www.sitepoint.com/getting-started-with-service-workers/ as a guide
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                return res;
            }


    var url = event.request.clone();
    return fetch(url).then(function(res){
        //if not a valid response send the error
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, response);
        });

        return res;
    });
  })
 );
});
