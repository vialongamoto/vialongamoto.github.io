const C='vialonga-v30';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin || u.host.includes('fonts.g') || u.host.includes('cdnjs.cloudflare.com')){
    e.respondWith(caches.match(e.request).then(r=>{
      const net=fetch(e.request).then(res=>{ if(res && res.status===200){ const cp=res.clone(); caches.open(C).then(c=>c.put(e.request,cp)); } return res; }).catch(()=>r);
      return r || net;
    }));
  }
});
