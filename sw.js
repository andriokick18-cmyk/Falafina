// FalaFina Service Worker — app instalável e funcionando offline
// v15: faixa-guia nas Aulas + desafios com botão "Treinar agora" que leva pro treino certo
// v14: Guia de Áreas (Mapa do FalaFina, "?" em toda tela, nomes claros)
// v8: ícones com nome correto (minúsculo) + NUNCA cacheia /api/ (dados da nuvem sempre frescos)
const CACHE = "falafina-v15";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./mascote.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // API da nuvem: sempre rede, nunca cache (senão o ranking/sync ficaria velho)
  if (url.pathname.startsWith("/api/") || e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
