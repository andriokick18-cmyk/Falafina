// FalaFina Service Worker — app instalável e funcionando offline
// v50: 🔊 SOM NA AVENTURA — chiptune 8-bit sintetizado (WebAudio, zero download, offline): golpe, erro, vitória, drop, encontro, fanfarra do chefe e derrota + botão 🔊/🔇 que fica salvo na conta
// v49: ⚔️ AVENTURA v1.1 MOBILE-FIRST — velocidade por tempo real (60/120Hz iguais), tela SEM barras pretas (escala que cobre tudo + retina), analógico FLUTUANTE (nasce embaixo do dedo), monstros acordam EM ORDEM (fraco→forte→CHEFE) com seta-guia dourada e intro de mapa, janela 🧍 Herói com o corpo e os slots equipados, 🌻15 na 1ª vitória de cada chefe
// v48: ⚔️ AVENTURA v1 — 10 ELEMENTOS + CHEFES + EQUIPAMENTOS-DICA: cada mapa tem um elemento (monstros do Tiny Dungeon) e um CHEFE que destrava o próximo; drops por baralho de pesos (espadas cortam alternativas, orbe fala, livro mostra o som, coroa responde, escudo absorve erro); mapa 11+ = modo PERFEITO; perguntas escalam até frases
// v47: ⚔️ AVENTURA FALAFINA v0 — nasce o RPG de exploração: tela cheia, analógico touch (Kenney Mobile Controls), mundo top-down (pico-8 City), batalhas PT/EN, Amuleto Rubi lendário no 1º monstro, mochila com poções (projeto completo em JOGO-AVENTURA.md)
// v46: 🕹️ ARCADE — 3 jogos novos (🃏 Memória Mágica com níveis palavra→frase, 👾 Invasão dos Monstrinhos, 👂 Eco da Caverna) na Home com previews + 🐾 pets com sprites REAIS (Kenney Cube Pets)
// v45: 🎰 ROLETA DIÁRIA DE LOGIN — substitui o baú grátis: sorteio/prêmio/log 100% no SERVIDOR (anti-trapaça), 1 giro por dia (Brasília); prêmios: baú (45%), 🌻40/100/200, VIP 3d (1/2mil), 7d (1/50mil), 30d (1/1milhão)
// v44: 🗼 A TORRE — progressão infinita da Masmorra: cada porta certa sobe 1 andar (pra sempre); a cada 20 andares um Baú da Torre, com tier subindo com a altura (madeira→prata→ouro→LENDÁRIO no 500+)
// v43: 🏰 MASMORRA v2 — arco completo (abertura com recordes → PASSOU!/OUCH! com shake e fade entre salas → final com recorde salvo) + card-jogo AO VIVO como 1º clique da Home
// v42: 🏰 MASMORRA DAS PALAVRAS — 1º jogo com sprites Kenney (pico-8, CC0): herói escolhe a porta com a palavra certa; corações, estrelas, XP e habilidade de vocabulário integrados
// v41: 🏰 HOME RPG (estandarte pessoal + barra de XP + quadro de missões de madeira) + 🔑 2 e-mails de admin (kick18 e usa2026); página Admin nem existe pra não-admin
// v40: 🖼️ ABA 1/redesenho RPG — 10 bordas de avatar refeitas como molduras de RPG (metal com relevo, gemas, glint mascarado, fagulhas) — NADA mais gira a foto
// v39: 🚩 SISTEMA-CÉLULA COMPRA=USO — card do Ranking é BÁSICO por padrão; Estandarte colorido/partículas/runas SÓ pra quem compra na Loja (aba Estandartes); Loja com raridades (Comum→Lendário), vitrine escura e selo EQUIPADO
// v38: 🛡️ ESTANDARTE MEDIEVAL — Banner de Prestígio virou brasão heráldico (haste+pomos, escudo com emblema, rabicho, rebites) + medalhas das Conquistas com fita
// v37: 👑 SISTEMA DE PRESTÍGIO — banner AAA por tier de XP em TODO o Ranking (lista, pódio e perfil), com partículas em canvas e shader WebGL no perfil
// v36: 🤖 COMPROVANTE CONFERIDO SOZINHO (valor+data → VIP na hora) + 🔑 conta admin fixa do Andrio + 🚫 revogar VIP falso
// v35: 🔑 ABA ADMIN dentro do app (aprovar pedidos sem sair do FalaFina) + 👑 perfil/ranking com muito mais vida (Rei do topo 1, bordas com mais brilho)
// v34: 👑 ABA VIP NA LOJA — 30 dias por R$30, 60 dias por R$50, direto pro checkout
// v33: 🎁 MODO GRÁTIS LIMITADO (nunca mais bloqueia) + 👑 COMPRAR VIP com Pix + comprovante + painel de aprovação
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
const CACHE = "falafina-v50";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./mascote.png", "./sprites/pico8.png", "./sprites/cidade.png", "./sprites/dungeon.png"];
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
