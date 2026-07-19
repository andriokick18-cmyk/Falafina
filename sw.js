// FalaFina Service Worker — app instalável e funcionando offline
// v32: 🧗 MODO CARREIRA REFEITO (vocabulário puro, sem entrevista/resposta pessoal) + 📄 Jornada H-2B (3 aulas novas)
// v31: 📌 PALAVRA DA VEZ — troca de 2 em 2h na tela de bloqueio (substitui em silêncio) e a cada volta ao app
// v30: 📲 BOTÃO "BAIXAR APP ANDROID" na barra esquerda (aba azul) — instalação unificada
// v29: 🏆 RANKING DE VOLTA AO MENU + PÓDIO RPG — a vitrine dos itens da Loja (pedido do Andrio)
// v28: 🔔 PUSH DA PALAVRA DO DIA — notificação diária (9h) que aparece na TELA DE BLOQUEIO
// v27: 📌 PALAVRA DO DIA — ideia do Andrio: palavra de impacto diária com frase EN+PT, trocar e compartilhar
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
const CACHE = "falafina-v32";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./mascote.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* 🔔 Palavra do Dia por push — aparece na tela de bloqueio do celular */
self.addEventListener("push", e => {
  let d = { t: "FalaFina 🦜", b: "Sua palavra do dia chegou — vem ver!" };
  try { d = e.data.json(); } catch (err) {}
  e.waitUntil(self.registration.showNotification(d.t, {
    body: d.b,
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    tag: "palavra-dia"
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(lista => {
    for (const c of lista) { if ("focus" in c) return c.focus(); }
    return clients.openWindow("./");
  }));
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
