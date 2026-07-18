// FalaFina Service Worker — app instalável e funcionando offline
// v26: ✂️ JOGOS ENXUTOS — lista compacta de treinos (1 linha por jogo), sem missões duplicadas
// v25: ✂️ GRANDE SIMPLIFICAÇÃO — menu 11→4 abas (Início/Aulas/Jogos/Progresso), Home enxuta, zero clique morto
// v24: 🌻 JARDIM TRANCHE 2 — corpus 420→780 palavras (18 bandas novas), tutorial dinâmico
// v23: 🛡️ PROTETOR DE SEQUÊNCIA — faltou 1 dia, o protetor salva o 🔥 sozinho (Loja, 🌻300, máx 2)
// v22: HOTFIX CRÍTICO — botão "Fazer o desafio" ficava escondido atrás da tabbar/banner PWA em conta nova no celular
// v21: INDICAÇÃO PREMIADA — quem indica ganha 🎁2+🌻100, quem chega ganha 🎁1+🌻50 (campo no cadastro)
// v20: CRESCIMENTO VIA WHATSAPP — cartão OG no compartilhamento + botões de convite com progresso real
// v19: PAINEL DO DONO (/admin) — quem chamar hoje, premium/baús em 1 toque; /admin nunca cacheado
// v18: CONVERSÃO DA SEMANA GRÁTIS — Primeiros Passos (7 quests), banner de urgência, Paywall 2.0
// v17: NINGUÉM FICA TRAVADO — missões se adaptam a aparelho sem mic/áudio, refazer aula conta, dica após 2 erros
// v16: MODO CARREIRA 2.0 — temporadas com 6 capítulos, fila de domínio, história real H-2B/H-2A
// v15: faixa-guia nas Aulas + desafios com botão "Treinar agora" que leva pro treino certo
// v14: Guia de Áreas (Mapa do FalaFina, "?" em toda tela, nomes claros)
// v8: ícones com nome correto (minúsculo) + NUNCA cacheia /api/ (dados da nuvem sempre frescos)
const CACHE = "falafina-v26";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./mascote.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // API da nuvem e Painel do Dono: sempre rede, nunca cache
  if (url.pathname.startsWith("/api/") || url.pathname === "/admin" || e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
