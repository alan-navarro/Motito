const C='cuentasmart-v2',A=['./','index.html','cocina.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
const OK=[self.location.origin,'https://www.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!OK.includes(new URL(r.url).origin))return;
e.respondWith(fetch(r).then(res=>{caches.open(C).then(c=>c.put(r,res.clone()));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
