const CACHE_CAND = "candidatos-cache-v1";
const urlsToCache = [
    './',
    './index.html', 
    './manifest.json', 
    './candidatos.json', 
    './js/script.js', 
    './css/style.css',
    './img/logo.jpeg',
    './img/icon.png',
    './img/instagram.svg',
    './img/facebook.svg',
    './img/search-01-stroke-rounded.svg'
 ]

 //Instalando Service Worker, salvando no cache.
 self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CACHE_CAND)
        .then((cache)=>{
            console.log('Arquivos em cache.');
            return cache.addAll(urlsToCache);
        })
    );
 });

//Excluindo versão antiga do cache.
 self.addEventListener('active', (event)=>{
    event.waitUntil(
        caches.keys().then((cacheName)=>{
            return Promise.all(
                cacheName.map((cache)=>{
                    if(cache !== CACHE_CAND){
                        console.log('Removendo cache antigo.', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
 });

 //Requesição do cache.
self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then((response)=>{
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    );
})