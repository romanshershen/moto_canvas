const staticCacheName = 'shershen-v2'
const dynamicCacheName = 'dynamic-v1'

const assetUrls = [
    'index.html',
    'index.js',
    'style.css',
    'offline.html'
]

self.addEventListener('install', async event => {
   const cache = await caches.open(staticCacheName)
   cache.addAll(assetUrls)
    
})

self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames
        .filter(name => name !== staticCacheName)
        .filter(name => name !== dynamicCacheName)
        .map(name => caches.delete(name))

    )
})


self.addEventListener('fetch', event => {
    const {request} = event

    const url = new URL(request.url)
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(event.request))
    } else {
        event.respondWith(networkFirst(request))
    }

      
})

async function cacheFirst(request){
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}

async function networkFirst(request){
    const cache = await caches.open(dynamicCacheName)
    try {
        const responce = await fetch(request)
        await cache.put(request, responce.clone())
        return responce
    } catch (error) {
        const cached = await cache.match(request)
        return cached ?? await caches.match('/offline.html')
    }
    
}