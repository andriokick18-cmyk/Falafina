/* ==================================================================
   FALAFINA — SERVIDOR v0.7 (Render.com)
   Missão nº 1: NENHUMA CONTA SE PERDE, NUNCA.
   - Node puro, zero dependências (mesmo padrão do H2BApply)
   - Dados em JSON no disco persistente /data (escrita atômica)
   - Backup automático diário (guarda os últimos 20)
   - O servidor NUNCA apaga progresso: ele só MESCLA
     (XP = maior valor, módulos = união, recordes = maiores)
   ================================================================== */
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const PUBLICO = __dirname; // site na mesma pasta do servidor (sem subpastas)
// Arquivos que o navegador PODE baixar — todo o resto é bloqueado
const ARQUIVOS_PUBLICOS = new Set(["/index.html", "/sw.js", "/manifest.json", "/icon-192.png", "/icon-512.png", "/mascote.png"]);
const LIMITE_CORPO = 400 * 1024;      // 400 KB por requisição
const LIMITE_FOTO = 80 * 1024;        // foto de perfil (data URL 128px ≈ 10-20 KB)

/* ---------- DISCO PERSISTENTE ----------
   No Render, monte um Disk em /data. Se não existir (teste local),
   cai para ./data — mas AVISA que sem o Disk os dados somem no deploy. */
let DATA_DIR = process.env.DATA_DIR || "/data";
try {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.accessSync(DATA_DIR, fs.constants.W_OK);
} catch (e) {
  DATA_DIR = path.join(__dirname, "data");
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.warn("[FalaFina] ⚠️ /data indisponível — usando ./data (SEM disco persistente os dados somem a cada deploy!)");
}
const ARQ_CONTAS = path.join(DATA_DIR, "ff_contas.json");
const DIR_BACKUPS = path.join(DATA_DIR, "backups");
fs.mkdirSync(DIR_BACKUPS, { recursive: true });

function log(msg) { console.log(new Date().toISOString() + " [FalaFina] " + msg); }

/* ---------- BANCO: leitura na memória + escrita atômica ---------- */
let CONTAS = {};
try {
  if (fs.existsSync(ARQ_CONTAS)) {
    CONTAS = JSON.parse(fs.readFileSync(ARQ_CONTAS, "utf8"));
    log("Banco carregado: " + Object.keys(CONTAS).length + " conta(s).");
  } else {
    log("Banco novo criado em " + ARQ_CONTAS);
  }
} catch (e) {
  // Arquivo corrompido: tenta o backup mais novo antes de desistir
  log("⚠️ ff_contas.json corrompido: " + e.message + " — tentando backups…");
  try {
    const bks = fs.readdirSync(DIR_BACKUPS).filter(f => f.endsWith(".json")).sort().reverse();
    for (const b of bks) {
      try {
        CONTAS = JSON.parse(fs.readFileSync(path.join(DIR_BACKUPS, b), "utf8"));
        log("✅ Restaurado do backup " + b + " (" + Object.keys(CONTAS).length + " contas).");
        break;
      } catch (e2) { /* tenta o próximo */ }
    }
  } catch (e3) { /* sem backups */ }
}

let salvandoAgendado = null;
function persistir() {
  // Escrita atômica: grava num .tmp e renomeia — nunca deixa arquivo pela metade
  clearTimeout(salvandoAgendado);
  salvandoAgendado = setTimeout(() => {
    try {
      const tmp = ARQ_CONTAS + ".tmp";
      fs.writeFileSync(tmp, JSON.stringify(CONTAS));
      fs.renameSync(tmp, ARQ_CONTAS);
    } catch (e) { log("❌ ERRO ao salvar contas: " + e.message); }
  }, 300);
}

/* ---------- BACKUP DIÁRIO (guarda 20) ---------- */
function fazerBackup() {
  try {
    const nome = "contas-" + new Date().toISOString().slice(0, 10) + ".json";
    const destino = path.join(DIR_BACKUPS, nome);
    if (!fs.existsSync(destino) && Object.keys(CONTAS).length) {
      fs.writeFileSync(destino, JSON.stringify(CONTAS));
      log("💾 Backup criado: " + nome);
    }
    const todos = fs.readdirSync(DIR_BACKUPS).filter(f => f.endsWith(".json")).sort();
    while (todos.length > 20) fs.unlinkSync(path.join(DIR_BACKUPS, todos.shift()));
  } catch (e) { log("⚠️ Backup falhou: " + e.message); }
}
fazerBackup();
setInterval(fazerBackup, 6 * 60 * 60 * 1000); // confere a cada 6h (cria 1 por dia)

/* ---------- SEGURANÇA ---------- */
// O site envia senhaHash (SHA-256 no navegador). O servidor guarda o hash DO hash:
// se alguém roubar o arquivo, não consegue nem o hash de login.
function hashServidor(senhaHash) {
  return crypto.createHash("sha256").update("ff-servidor:" + String(senhaHash)).digest("hex");
}
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limparPerfil(p) {
  if (!p || typeof p !== "object") return null;
  const foto = (typeof p.foto === "string" && p.foto.startsWith("data:image") && p.foto.length <= LIMITE_FOTO) ? p.foto : null;
  return {
    foto,
    anoNascimento: Number(p.anoNascimento) || null,
    nivel: (p.nivel === 0 || p.nivel) ? Number(p.nivel) : null,
    focos: Array.isArray(p.focos) ? p.focos.slice(0, 10).map(String) : []
  };
}

/* Mesma regra do site: mescla progresso SEM NUNCA PERDER NADA */
function mesclarProgresso(a, b) {
  if (!a) return b || null;
  if (!b) return a;
  const r = Object.assign({}, a, b);
  r.xp = Math.max(a.xp || 0, b.xp || 0);
  r.recordeStreak = Math.max(a.recordeStreak || 0, b.recordeStreak || 0);
  r.melhorSeq = Math.max(a.melhorSeq || 0, b.melhorSeq || 0);
  const _ti = [a.trialInicio, b.trialInicio].filter(Boolean).sort();
  if (_ti.length) r.trialInicio = _ti[0];
  r.stats = Object.assign({}, b.stats || {}, a.stats || {});
  for(const k in (b.stats || {})){ const sa = (a.stats || {})[k], sb = b.stats[k]; if(sa && sb) r.stats[k] = ((sb.ex || 0) > (sa.ex || 0)) ? sb : sa; }
  r.favoritos = Object.assign({}, a.favoritos || {}, b.favoritos || {});
  r.resgates = Object.assign({}, a.resgates || {}, b.resgates || {});
  r.sim = { dominadas: Object.assign({}, (a.sim || {}).dominadas || {}, (b.sim || {}).dominadas || {}), erros: Object.assign({}, (a.sim || {}).erros || {}, (b.sim || {}).erros || {}) };
  r.diasSeguidos = Math.max(a.diasSeguidos || 0, b.diasSeguidos || 0);
  r.ultimoDiaAtivo = [a.ultimoDiaAtivo, b.ultimoDiaAtivo].filter(Boolean).sort().pop();
  if ((a.dataXpHoje || "") > (b.dataXpHoje || "")) { r.dataXpHoje = a.dataXpHoje; r.xpHoje = a.xpHoje || 0; }
  else if ((a.dataXpHoje || "") < (b.dataXpHoje || "")) { r.dataXpHoje = b.dataXpHoje; r.xpHoje = b.xpHoje || 0; }
  else { r.xpHoje = Math.max(a.xpHoje || 0, b.xpHoje || 0); }
  r.modulosFeitos = Object.assign({}, a.modulosFeitos || {}, b.modulosFeitos || {});
  const ea = a.escalada || { nivel: 1, recorde: 1 }, eb = b.escalada || { nivel: 1, recorde: 1 };
  r.escalada = { nivel: Math.max(ea.nivel || 1, eb.nivel || 1), recorde: Math.max(ea.recorde || 1, eb.recorde || 1) };
  /* RPG: baús = união (nunca reabre) · tempos = MENOR por nível · ritmo = MENOR */
  r.escalada.baus = Object.assign({}, ea.baus || {}, eb.baus || {});
  r.escalada.tempos = {};
  new Set(Object.keys(ea.tempos || {}).concat(Object.keys(eb.tempos || {}))).forEach(k => {
    const va = (ea.tempos || {})[k], vb = (eb.tempos || {})[k];
    r.escalada.tempos[k] = (va && vb) ? Math.min(va, vb) : (va || vb);
  });
  const ra = ea.melhorRitmo || 0, rb = eb.melhorRitmo || 0;
  r.escalada.melhorRitmo = (ra && rb) ? Math.min(ra, rb) : (ra || rb || null);
  /* Carteira 🌱 monotônica: ganhas/gastas só crescem → máximo nunca perde nem duplica.
     Itens comprados = união. Equipado = o cliente (b) manda, é o estado mais fresco. */
  const ca = a.cosmeticos || {}, cb = b.cosmeticos || {};
  const bausA = ca.baus || {}, bausB = cb.baus || {};
  r.cosmeticos = {
    tem: Object.assign({}, ca.tem || {}, cb.tem || {}),
    usando: Object.assign({}, ca.usando || {}, cb.usando || {}),
    ganhas: Math.max(ca.ganhas || 0, cb.ganhas || 0),
    gastas: Math.max(ca.gastas || 0, cb.gastas || 0),
    /* Baús: comprados/abertos só CRESCEM (nunca perde baú comprado nem duplica
       abertura já contada); a data do baú grátis fica a mais recente das duas. */
    baus: {
      comprados: Math.max(bausA.comprados || 0, bausB.comprados || 0),
      abertos: Math.max(bausA.abertos || 0, bausB.abertos || 0),
      ultimoGratis: [bausA.ultimoGratis, bausB.ultimoGratis].filter(Boolean).sort().pop() || null
    }
  };
  r.medalhasPagas = Object.assign({}, a.medalhasPagas || {}, b.medalhasPagas || {});
  /* Modo Carreira: progressão BASE que nunca reseta. Contadores = maior
     dos dois lados; posição na história (temporada/capítulo) = a do lado
     mais avançado (comparação temporada → capítulo → respostas fortes). */
  const carA = a.carreira || {}, carB = b.carreira || {};
  const posDe = x => [x.temporada || 1, x.cap || 0, x.capOk || 0];
  const pa = posDe(carA), pb = posDe(carB);
  let lider = carA;
  for(let i = 0; i < 3; i++){
    if(pa[i] !== pb[i]){ lider = pa[i] > pb[i] ? carA : carB; break; }
  }
  r.carreira = {
    nivel: Math.max(carA.nivel || 1, carB.nivel || 1),
    acertos: Math.max(carA.acertos || 0, carB.acertos || 0),
    respondidas: Math.max(carA.respondidas || 0, carB.respondidas || 0),
    temporada: lider.temporada || 1,
    cap: lider.cap || 0,
    capOk: lider.capOk || 0,
    temporadasFeitas: Math.max(carA.temporadasFeitas || 0, carB.temporadasFeitas || 0),
    emp: lider.emp || carA.emp || carB.emp || null,
    cid: lider.cid || carA.cid || carB.cid || null
  };
  /* 🛡️ Protetores de sequência: comprados/usados só crescem → máximo é seguro */
  const prA = a.protetores || {}, prB = b.protetores || {};
  r.protetores = { comprados: Math.max(prA.comprados || 0, prB.comprados || 0), usados: Math.max(prA.usados || 0, prB.usados || 0) };
  /* Learning Engine: contadores por habilidade e uso de jogos — só crescem */
  const habA = a.habilidades || {}, habB = b.habilidades || {};
  r.habilidades = {};
  for(const s of new Set([...Object.keys(habA), ...Object.keys(habB)])){
    r.habilidades[s] = {
      tent: Math.max((habA[s] || {}).tent || 0, (habB[s] || {}).tent || 0),
      ok: Math.max((habA[s] || {}).ok || 0, (habB[s] || {}).ok || 0)
    };
  }
  r.tutoriaisVistos = Object.assign({}, a.tutoriaisVistos || {}, b.tutoriaisVistos || {});
  /* Jardim de Palavras: caixas SRS por modo — mescla pela MAIOR caixa
     (não perde progresso) e pela data de revisão mais distante */
  const lexA = a.lexico || {}, lexB = b.lexico || {};
  r.lexico = {};
  for(const i of new Set([...Object.keys(lexA), ...Object.keys(lexB)])){
    const xa = lexA[i] || {}, xb = lexB[i] || {};
    const pa = xa.prox || {}, pb = xb.prox || {};
    r.lexico[i] = {
      l: Math.max(xa.l || 0, xb.l || 0), o: Math.max(xa.o || 0, xb.o || 0),
      e: Math.max(xa.e || 0, xb.e || 0), f: Math.max(xa.f || 0, xb.f || 0),
      prox: { l: Math.max(pa.l || 0, pb.l || 0), o: Math.max(pa.o || 0, pb.o || 0),
              e: Math.max(pa.e || 0, pb.e || 0), f: Math.max(pa.f || 0, pb.f || 0) }
    };
  }
  const usoA = a.jogosUso || {}, usoB = b.jogosUso || {};
  r.jogosUso = {};
  for(const j of new Set([...Object.keys(usoA), ...Object.keys(usoB)])){
    r.jogosUso[j] = Math.max(usoA[j] || 0, usoB[j] || 0);
  }
  r.srs = Object.assign({}, a.srs || {});
  for (const k in (b.srs || {})) {
    const ia = r.srs[k], ib = b.srs[k];
    if (!ia || (ib.proxima || 0) > (ia.proxima || 0)) r.srs[k] = ib;
  }
  if (r.nivelEscolhido == null) r.nivelEscolhido = (a.nivelEscolhido != null ? a.nivelEscolhido : b.nivelEscolhido);
  return r;
}

function contaPublica(c) {
  return { nome: c.nome, email: c.email, criadaEm: c.criadaEm, premiumAte: c.premiumAte || 0, perfil: c.perfil || null, progresso: c.progresso || null };
}

/* ---------- LEITURA DO CORPO (com limite) ---------- */
function lerCorpo(req) {
  return new Promise((resolve) => {
    let tam = 0; const partes = [];
    req.on("data", ch => {
      tam += ch.length;
      if (tam > LIMITE_CORPO) { resolve(null); try { req.destroy(); } catch (e) {} return; }
      partes.push(ch);
    });
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(partes).toString("utf8") || "{}")); }
      catch (e) { resolve(null); }
    });
    req.on("error", () => resolve(null));
  });
}

function responder(res, status, obj) {
  const corpo = JSON.stringify(obj);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(corpo);
}

/* ---------- PROTEÇÃO BÁSICA: limite de tentativas por IP ---------- */
const tentativas = {}; // ip -> { n, ate }
function bloqueado(ip) {
  const t = tentativas[ip];
  if (!t) return false;
  if (Date.now() > t.ate) { delete tentativas[ip]; return false; }
  return t.n >= 30; // 30 chamadas de login/registro por 10 min por IP
}
function marcarTentativa(ip) {
  const t = tentativas[ip] || { n: 0, ate: Date.now() + 10 * 60 * 1000 };
  t.n++; tentativas[ip] = t;
}
setInterval(() => { const ag = Date.now(); for (const ip in tentativas) if (ag > tentativas[ip].ate) delete tentativas[ip]; }, 5 * 60 * 1000);

/* ==================================================================
   🔔 PUSH — Palavra do Dia na TELA DE BLOQUEIO (ideia do Andrio).
   - web-push carregado com tolerância: sem a dependência instalada o
     servidor NÃO quebra, só desativa o push e loga a instrução
     (no Render: Build Command precisa ser "npm install").
   - Chaves VAPID auto-geradas no 1º boot e salvas em /data (zero
     configuração pro Andrio).
   - Envio diário ~9h de Brasília; rota admin /api/push/testar pra
     testar na hora no próprio celular.
   ================================================================== */
let webpush = null;
try { webpush = require("web-push"); }
catch (e) { log("🔕 web-push não instalado — push desativado. No Render, confira o Build Command: npm install"); }
const ARQ_VAPID = path.join(DATA_DIR, "vapid.json");
let VAPID = null;
if (webpush) {
  try { VAPID = JSON.parse(fs.readFileSync(ARQ_VAPID, "utf8")); }
  catch (e) {
    VAPID = webpush.generateVAPIDKeys();
    try { fs.writeFileSync(ARQ_VAPID, JSON.stringify(VAPID)); } catch (e2) {}
    log("🔑 Chaves VAPID do push geradas e salvas");
  }
  try { webpush.setVapidDetails("mailto:ndrkick.3@gmail.com", VAPID.publicKey, VAPID.privateKey); }
  catch (e) { webpush = null; log("🔕 VAPID inválido — push desativado: " + e.message); }
}
/* Pool da Palavra do Dia: lido DIRETO do index.html (fonte única, sem duplicação) */
let PUSH_POOL = [];
try {
  const htmlApp = fs.readFileSync(path.join(PUBLICO, "index.html"), "utf8");
  const mPool = htmlApp.match(/const PALAVRA_DIA_POOL = (\[[\s\S]*?\n\]);/);
  if (mPool) PUSH_POOL = eval(mPool[1]);
  log("📌 Pool da Palavra do Dia: " + PUSH_POOL.length + " palavras");
} catch (e) { log("⚠️ Pool da Palavra do Dia não carregou: " + e.message); }
function palavraDoDiaSrv() {
  if (!PUSH_POOL.length) return null;
  const agoraBr = new Date(Date.now() - 3 * 3600e3); // Brasília ~UTC-3
  const d = agoraBr.toISOString().slice(0, 10);
  let h = 0;
  for (let i = 0; i < d.length; i++) h = (h * 31 + d.charCodeAt(i)) >>> 0;
  return PUSH_POOL[h % PUSH_POOL.length];
}
async function enviarPalavraDoDia() {
  if (!webpush) return { erro: "web-push não instalado no servidor" };
  const w = palavraDoDiaSrv();
  if (!w) return { erro: "pool vazio" };
  const payload = JSON.stringify({
    t: "📌 Palavra do Dia: " + w.en.toUpperCase(),
    b: "🗣️ " + w.som + " = " + w.pt + "\n\"" + w.fEn + "\"\n" + w.fPt
  });
  let enviadas = 0, falhas = 0;
  for (const c of Object.values(CONTAS)) {
    if (!c.push) continue;
    try { await webpush.sendNotification(c.push, payload); enviadas++; }
    catch (e) {
      falhas++;
      if (e.statusCode === 404 || e.statusCode === 410) delete c.push; // assinatura morta: limpa
    }
  }
  persistir();
  log("🔔 Push Palavra do Dia (" + w.en + "): " + enviadas + " enviadas, " + falhas + " falhas");
  return { ok: true, palavra: w.en, enviadas, falhas };
}
let ultimoEnvioPush = null;
setInterval(() => {
  const agoraBr = new Date(Date.now() - 3 * 3600e3);
  const dia = agoraBr.toISOString().slice(0, 10);
  if (agoraBr.getUTCHours() === 9 && ultimoEnvioPush !== dia) {
    ultimoEnvioPush = dia;
    enviarPalavraDoDia();
  }
}, 5 * 60 * 1000);

/* ---------- API ---------- */
async function tratarApi(req, res, rota, ip) {
  // Saúde do servidor
  if (rota === "/api/saude" && req.method === "GET") {
    return responder(res, 200, { ok: true, servidor: "FalaFina v0.7", contas: Object.keys(CONTAS).length, discoPersistente: DATA_DIR === "/data" || !!process.env.DATA_DIR });
  }

  // Ranking mundial (top 50 por XP) — nunca expõe e-mail dos outros
  if (rota.startsWith("/api/ranking") && req.method === "GET") {
    const eu = decodeURIComponent((rota.split("eu=")[1] || "")).toLowerCase();
    const lista = Object.values(CONTAS)
      .filter(c => c.progresso && (c.progresso.xp || 0) > 0)
      .sort((a, b) => (b.progresso.xp || 0) - (a.progresso.xp || 0))
      .slice(0, 50)
      .map(c => {
        const co = c.progresso.cosmeticos || {}, us = co.usando || {}, tem = co.tem || {};
        const uso = s => (us[s] && tem[s + ":" + us[s]]) ? String(us[s]).slice(0, 20) : null;
        const esc = c.progresso.escalada || {};
        return {
          nome: String(c.nome || "Aluno").slice(0, 30),
          foto: (c.perfil && c.perfil.foto) || null,
          xp: c.progresso.xp || 0,
          diasSeguidos: c.progresso.diasSeguidos || 0,
          recorde: esc.recorde || 1,
          desafios: Object.keys(c.progresso.resgates || {}).length,
          ritmo: esc.melhorRitmo || null,
          borda: uso("borda"), pet: uso("pet"), efeito: uso("efeito"),
          voce: !!eu && c.email === eu,
          /* Resumo público pro modal de perfil (clique no nome do ranking) */
          resumo: {
            modulosFeitos: Object.keys(c.progresso.modulosFeitos || {}).length,
            dominadas: Object.keys((c.progresso.sim || {}).dominadas || {}).length,
            recorde: esc.recorde || 1,
            baus: Object.keys(esc.baus || {}).length,
            desafios: Object.keys(c.progresso.resgates || {}).length,
            itens: Object.keys(tem).length,
            xp: c.progresso.xp || 0,
            melhorSeq: c.progresso.melhorSeq || 0,
            palavras: Object.keys(c.progresso.srs || {}).filter(k => (c.progresso.srs[k].caixa || 0) >= 1).length,
            pronOk: 0,
            carreiraNivel: (c.progresso.carreira && c.progresso.carreira.nivel) || 1,
            diasSeguidos: c.progresso.diasSeguidos || 0
          }
        };
      });
    return responder(res, 200, { ok: true, ranking: lista });
  }

  // Rota admin do Premium é GET (pra abrir direto no navegador do celular)
  if (rota.startsWith("/api/premium") && req.method === "GET") return ativarPremium(req, res);
  // Rota admin pra creditar baús comprados (após confirmar pagamento manual)
  if (rota.startsWith("/api/creditar-baus") && req.method === "GET") return creditarBaus(req, res);
  // Dados do Painel do Dono (protegido pela ADMIN_CHAVE)
  if (rota.startsWith("/api/admin/dados") && req.method === "GET") return adminDados(req, res);
  // 🔔 Push: chave pública (pro navegador assinar)
  if (rota.startsWith("/api/push/chave") && req.method === "GET") {
    if (!webpush || !VAPID) return responder(res, 503, { erro: "Push indisponível no servidor (web-push não instalado — Build Command: npm install)" });
    return responder(res, 200, { ok: true, publicKey: VAPID.publicKey });
  }
  // 🔔 Push: teste imediato (admin) — abre no celular e vê a notificação chegar
  if (rota.startsWith("/api/push/testar") && req.method === "GET") {
    const u = new URL(req.url, "http://x");
    const ADMIN = process.env.ADMIN_CHAVE || "";
    if (!ADMIN || (u.searchParams.get("chave") || "") !== ADMIN) return responder(res, 403, { erro: "Chave errada." });
    const r = await enviarPalavraDoDia();
    return responder(res, r.ok ? 200 : 503, r);
  }
  if (req.method !== "POST") return responder(res, 405, { erro: "Método não permitido" });
  const corpo = await lerCorpo(req);
  if (!corpo) return responder(res, 400, { erro: "Corpo inválido ou grande demais" });

  const email = String(corpo.email || "").trim().toLowerCase();
  const senhaHash = String(corpo.senhaHash || "");

  // Criar conta
  if (rota === "/api/registrar") {
    if (bloqueado(ip)) return responder(res, 429, { erro: "Muitas tentativas — aguarde uns minutos" });
    marcarTentativa(ip);
    const nome = String(corpo.nome || "").trim().slice(0, 30);
    if (nome.length < 2) return responder(res, 400, { erro: "Nome inválido" });
    if (!RE_EMAIL.test(email)) return responder(res, 400, { erro: "E-mail inválido" });
    if (senhaHash.length < 8) return responder(res, 400, { erro: "Senha inválida" });
    if (CONTAS[email]) return responder(res, 409, { erro: "E-mail já cadastrado" });
    CONTAS[email] = {
      nome, email,
      senhaServidor: hashServidor(senhaHash),
      criadaEm: new Date().toISOString(),
      perfil: limparPerfil(corpo.perfil),
      progresso: (corpo.progresso && typeof corpo.progresso === "object") ? corpo.progresso : null
    };
    /* 📣 INDICAÇÃO PREMIADA: quem convidou ganha 🌻100 + 🎁2 baús;
       quem chegou ganha 🌻50 + 🎁1 baú. A carteira é monotônica
       (ganhas/comprados só crescem), então o crédito sobrevive a
       qualquer sincronização. Teto de 100 indicações por conta. */
    let indicacao = null;
    const indicadoPor = String(corpo.indicadoPor || "").trim().toLowerCase();
    if (indicadoPor && indicadoPor !== email && RE_EMAIL.test(indicadoPor) && CONTAS[indicadoPor]) {
      const padrinho = CONTAS[indicadoPor];
      padrinho.indicacoes = (padrinho.indicacoes || 0) + 1;
      if (padrinho.indicacoes <= 100) {
        const carteira = conta => {
          if (!conta.progresso) conta.progresso = { xp: 0 };
          if (!conta.progresso.cosmeticos) conta.progresso.cosmeticos = { tem: {}, usando: {}, ganhas: 0, gastas: 0 };
          if (!conta.progresso.cosmeticos.baus) conta.progresso.cosmeticos.baus = { comprados: 0, abertos: 0, ultimoGratis: null };
          return conta.progresso.cosmeticos;
        };
        const cp = carteira(padrinho);
        cp.ganhas = (cp.ganhas || 0) + 100;
        cp.baus.comprados = (cp.baus.comprados || 0) + 2;
        const cn = carteira(CONTAS[email]);
        cn.ganhas = (cn.ganhas || 0) + 50;
        cn.baus.comprados = (cn.baus.comprados || 0) + 1;
        CONTAS[email].indicadoPor = indicadoPor;
        indicacao = { padrinho: indicadoPor };
        log("📣 Indicação: " + email + " chegou por " + indicadoPor + " (" + padrinho.indicacoes + "ª dele)");
      }
    }
    persistir();
    log("✨ Conta criada: " + email + " (total: " + Object.keys(CONTAS).length + ")");
    return responder(res, 200, { ok: true, conta: contaPublica(CONTAS[email]), indicacao });
  }

  // Entrar
  if (rota === "/api/entrar") {
    if (bloqueado(ip)) return responder(res, 429, { erro: "Muitas tentativas — aguarde uns minutos" });
    marcarTentativa(ip);
    const c = CONTAS[email];
    if (!c) return responder(res, 404, { erro: "Conta não encontrada" });
    if (c.senhaServidor !== hashServidor(senhaHash)) return responder(res, 401, { erro: "Senha errada" });
    return responder(res, 200, { ok: true, conta: contaPublica(c) });
  }

  // Sincronizar progresso (autenticado por e-mail + senhaHash)
  if (rota === "/api/sincronizar") {
    const c = CONTAS[email];
    if (!c) return responder(res, 404, { erro: "Conta não encontrada" });
    if (c.senhaServidor !== hashServidor(senhaHash)) return responder(res, 401, { erro: "Senha errada" });
    if (corpo.progresso && typeof corpo.progresso === "object") {
      c.progresso = mesclarProgresso(c.progresso, corpo.progresso); // NUNCA perde nada
    }
    if (corpo.perfil && typeof corpo.perfil === "object") {
      const p = limparPerfil(corpo.perfil);
      if (p) c.perfil = p;
    }
    if (typeof corpo.nome === "string" && corpo.nome.trim().length >= 2) c.nome = corpo.nome.trim().slice(0, 30);
    c.ultimaSync = new Date().toISOString();
    persistir();
    return responder(res, 200, { ok: true, conta: contaPublica(c) });
  }

  // 🔔 Push: assinar / cancelar (autenticado — a assinatura fica na conta)
  if (rota === "/api/push/assinar") {
    const c = CONTAS[email];
    if (!c) return responder(res, 404, { erro: "Conta não encontrada" });
    if (c.senhaServidor !== hashServidor(senhaHash)) return responder(res, 401, { erro: "Senha errada" });
    if (!corpo.sub || typeof corpo.sub !== "object" || !corpo.sub.endpoint) return responder(res, 400, { erro: "Assinatura inválida" });
    c.push = corpo.sub;
    persistir();
    log("🔔 Push assinado: " + email);
    return responder(res, 200, { ok: true });
  }
  if (rota === "/api/push/sair") {
    const c = CONTAS[email];
    if (!c) return responder(res, 404, { erro: "Conta não encontrada" });
    if (c.senhaServidor !== hashServidor(senhaHash)) return responder(res, 401, { erro: "Senha errada" });
    delete c.push;
    persistir();
    return responder(res, 200, { ok: true });
  }

  return responder(res, 404, { erro: "Rota não existe" });
}

/* ---------- ARQUIVOS DO SITE (index.html, ícones, sw.js…) ---------- */
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".png": "image/png",
  ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json"
};
function servirArquivo(res, rota) {
  let arq = rota === "/" ? "/index.html" : rota;
  if (!ARQUIVOS_PUBLICOS.has(arq)) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("404"); }
  const caminho = path.join(PUBLICO, arq);
  fs.readFile(caminho, (err, dados) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("404"); }
    const ext = path.extname(caminho).toLowerCase();
    const semCache = ext === ".html" || arq === "/sw.js" || ext === ".json";
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": semCache ? "no-cache" : "public, max-age=604800"
    });
    res.end(dados);
  });
}

/* ---------- SERVIDOR ---------- */
const servidor = http.createServer(async (req, res) => {
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
  const rota = (req.url || "/").split("#")[0];
  try {
    if (rota.startsWith("/api/")) return await tratarApi(req, res, rota, ip);
    if (req.method !== "GET") return responder(res, 405, { erro: "Método não permitido" });
    if (rota.split("?")[0] === "/admin") return servirAdmin(res);
    return servirArquivo(res, rota.split("?")[0]);
  } catch (e) {
    log("❌ Erro na rota " + rota + ": " + e.message);
    return responder(res, 500, { erro: "Erro interno" });
  }
});

servidor.listen(PORT, () => {
  log("🦜 FalaFina no ar na porta " + PORT + " · dados em " + DATA_DIR + " · " + Object.keys(CONTAS).length + " conta(s)");
});

/* Salva tudo antes de desligar (deploy/restart do Render) */
function desligar() {
  try {
    const tmp = ARQ_CONTAS + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(CONTAS));
    fs.renameSync(tmp, ARQ_CONTAS);
    log("💾 Contas salvas antes de desligar.");
  } catch (e) {}
  process.exit(0);
}
process.on("SIGTERM", desligar);
process.on("SIGINT", desligar);

  /* ---------- ADMIN: creditar baús comprados (só o Andrio) ----------
     Depois de confirmar o Pix/pagamento manual pelo WhatsApp, abra:
     https://SEU-SITE.onrender.com/api/creditar-baus?chave=SUACHAVE&email=aluno@email.com&qtd=200 */
  function creditarBaus(req, res) {
    const u = new URL(req.url, "http://x");
    const ADMIN = process.env.ADMIN_CHAVE || "";
    if (!ADMIN) return responder(res, 403, { erro: "Defina ADMIN_CHAVE nas variáveis do Render para usar esta rota." });
    if ((u.searchParams.get("chave") || "") !== ADMIN) return responder(res, 403, { erro: "Chave errada." });
    const email = (u.searchParams.get("email") || "").trim().toLowerCase();
    const qtd = Math.max(1, Math.min(10000, parseInt(u.searchParams.get("qtd") || "0", 10) || 0));
    const c = CONTAS[email];
    if (!c) return responder(res, 404, { erro: "Conta não encontrada: " + email });
    if (!c.progresso) c.progresso = { xp: 0 };
    if (!c.progresso.cosmeticos) c.progresso.cosmeticos = { tem: {}, usando: {}, ganhas: 0, gastas: 0 };
    if (!c.progresso.cosmeticos.baus) c.progresso.cosmeticos.baus = { comprados: 0, abertos: 0, ultimoGratis: null };
    c.progresso.cosmeticos.baus.comprados = (c.progresso.cosmeticos.baus.comprados || 0) + qtd;
    persistir();
    log("🎁 Baús creditados: " + email + " +" + qtd + " (total comprados: " + c.progresso.cosmeticos.baus.comprados + ")");
    return responder(res, 200, { ok: true, email, qtd, totalComprados: c.progresso.cosmeticos.baus.comprados });
  }

  /* ---------- ADMIN: dados do Painel do Dono ----------
     Nunca expõe senha (nem hash). Só métricas de negócio. */
  function adminDados(req, res) {
    const u = new URL(req.url, "http://x");
    const ADMIN = process.env.ADMIN_CHAVE || "";
    if (!ADMIN) return responder(res, 403, { erro: "Defina ADMIN_CHAVE nas variáveis do Render para usar o painel." });
    if ((u.searchParams.get("chave") || "") !== ADMIN) return responder(res, 403, { erro: "Chave errada." });
    const contas = Object.values(CONTAS).map(c => {
      const p = c.progresso || {};
      return {
        email: c.email,
        nome: String(c.nome || "").slice(0, 30),
        criadaEm: c.criadaEm || null,
        ultimaSync: c.ultimaSync || null,
        premiumAte: c.premiumAte || null,
        xp: p.xp || 0,
        diasSeguidos: p.diasSeguidos || 0,
        melhorSeq: p.melhorSeq || 0,
        trialInicio: p.trialInicio || null,
        temporada: (p.carreira && p.carreira.temporada) || 1,
        aulas: Object.keys(p.modulosFeitos || {}).length,
        bausComprados: ((p.cosmeticos || {}).baus || {}).comprados || 0,
        indicacoes: c.indicacoes || 0,
        indicadoPor: c.indicadoPor || null
      };
    });
    return responder(res, 200, { ok: true, agora: Date.now(), trialDias: 7, contas });
  }

  /* ---------- ADMIN: Painel do Dono (/admin) ----------
     Uma página, zero dependências. A página em si não tem dado nenhum —
     tudo vem de /api/admin/dados, que exige a ADMIN_CHAVE. */
  function servirAdmin(res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" });
    res.end(PAGINA_ADMIN);
  }
  const PAGINA_ADMIN = `<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex,nofollow"><title>FalaFina · Painel do Dono</title>
<style>
:root{--verde:#00885F;--papel:#FFF8EE;--tinta:#21313A;--suave:#5A6B74;--sol:#FFC53D;--coral:#E4572E;--azul:#2D5DA8}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,sans-serif;background:var(--papel);color:var(--tinta);padding:14px;font-size:15px}
h1{font-size:1.25rem;margin-bottom:4px}
.sub{color:var(--suave);font-weight:600;font-size:.85rem;margin-bottom:14px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:16px}
.card{background:#fff;border:2px solid rgba(33,49,58,.12);border-radius:12px;padding:10px 12px}
.card b{font-size:1.3rem;display:block}
.card small{color:var(--suave);font-weight:700;font-size:.7rem;text-transform:uppercase;letter-spacing:.5px}
.secao{font-weight:800;margin:18px 0 8px;font-size:1rem}
.aluno{background:#fff;border:2px solid rgba(33,49,58,.12);border-radius:12px;padding:10px 12px;margin-bottom:8px}
.aluno .top{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center}
.aluno b{font-size:.95rem}
.aluno .mail{color:var(--suave);font-weight:600;font-size:.8rem;word-break:break-all}
.tag{font-size:.68rem;font-weight:800;padding:3px 8px;border-radius:99px;color:#fff;white-space:nowrap}
.t-hoje{background:var(--coral)} .t-trial{background:var(--sol);color:#5C4400} .t-prem{background:var(--verde)} .t-exp{background:var(--suave)} .t-novo{background:var(--azul)}
.meta{font-size:.78rem;color:var(--suave);font-weight:700;margin-top:4px}
.acoes{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.acoes button{border:none;border-radius:9px;padding:7px 10px;font-weight:800;font-size:.78rem;cursor:pointer;color:#fff;background:var(--verde)}
.acoes button.azul{background:var(--azul)} .acoes button.cinza{background:var(--suave)}
input,select{font-family:inherit;font-weight:700;padding:10px;border:2px solid rgba(33,49,58,.2);border-radius:10px;font-size:.9rem}
#busca{width:100%;margin-bottom:10px}
#entrar{display:flex;gap:8px;margin:20px 0}
#msg{font-weight:700;color:var(--coral);margin:8px 0;min-height:20px}
.vazio{color:var(--suave);font-weight:700;font-size:.85rem;padding:8px}
</style></head><body>
<h1>🦜 FalaFina — Painel do Dono</h1>
<p class="sub">Quem chamar hoje, quem é Premium, ativação em 1 toque. Só você vê isso (ADMIN_CHAVE).</p>
<div id="entrar"><input type="password" id="chave" placeholder="Sua ADMIN_CHAVE" style="flex:1"><button onclick="entrar()" style="background:var(--verde);color:#fff;border:none;border-radius:10px;padding:10px 16px;font-weight:800;cursor:pointer">Entrar</button></div>
<div id="msg"></div>
<div id="painel" style="display:none">
  <div class="cards" id="stats"></div>
  <div class="secao">🎯 Quem chamar HOJE (trial acabando ou recém-expirado)</div>
  <div id="chamar"></div>
  <div class="secao">👥 Todos os alunos <span id="qtd" style="color:var(--suave)"></span></div>
  <input id="busca" placeholder="Buscar por nome ou e-mail..." oninput="desenhar()">
  <div id="lista"></div>
</div>
<script>
"use strict";
let CHAVE = localStorage.getItem("ff_admin_chave") || "";
let DADOS = null;
const $ = s => document.querySelector(s);
if (CHAVE) { $("#chave").value = CHAVE; entrar(); }
async function entrar() {
  CHAVE = $("#chave").value.trim();
  $("#msg").textContent = "Carregando...";
  try {
    const r = await fetch("/api/admin/dados?chave=" + encodeURIComponent(CHAVE));
    const j = await r.json();
    if (!j.ok) { $("#msg").textContent = "❌ " + (j.erro || "Erro"); return; }
    localStorage.setItem("ff_admin_chave", CHAVE);
    DADOS = j; $("#msg").textContent = ""; $("#painel").style.display = "block"; $("#entrar").style.display = "none";
    desenhar();
  } catch (e) { $("#msg").textContent = "❌ Sem conexão com o servidor"; }
}
function statusDe(c) {
  const ag = DADOS.agora;
  if (c.premiumAte && c.premiumAte > ag) return { id: "prem", rot: "👑 Premium até " + new Date(c.premiumAte).toLocaleDateString("pt-BR"), cls: "t-prem", pri: 3 };
  if (!c.trialInicio) return { id: "novo", rot: "✨ Novo (trial não começou)", cls: "t-novo", pri: 4 };
  const passados = Math.floor((ag - new Date(c.trialInicio + "T00:00:00").getTime()) / 86400000);
  const resta = DADOS.trialDias - passados;
  if (resta > 1) return { id: "trial", rot: "🎁 Trial: " + resta + " dias", cls: "t-trial", pri: 5 };
  if (resta === 1 || resta === 0) return { id: "hoje", rot: resta === 1 ? "⏳ ÚLTIMO DIA de trial" : "🔴 Trial ACABA HOJE", cls: "t-hoje", pri: 1 };
  return { id: "exp", rot: "🔒 Expirou há " + (-resta) + " dia" + (resta === -1 ? "" : "s"), cls: "t-exp", pri: (-resta <= 7 && c.xp > 30) ? 2 : 6 };
}
function cartaoAluno(c, st) {
  const sync = c.ultimaSync ? new Date(c.ultimaSync).toLocaleDateString("pt-BR") : "nunca";
  return '<div class="aluno"><div class="top"><div><b>' + esc(c.nome || "(sem nome)") + '</b><div class="mail">' + esc(c.email) + '</div></div><span class="tag ' + st.cls + '">' + st.rot + "</span></div>" +
    '<div class="meta">⭐ ' + c.xp + " XP · 🔥 melhor " + c.melhorSeq + "d · 📚 " + c.aulas + " aulas · 🧗 T" + c.temporada + (c.indicacoes ? " · 📣 " + c.indicacoes + " indicou" : "") + " · última visita: " + sync + "</div>" +
    '<div class="acoes">' +
    '<button onclick="premium(\\'' + c.email + '\\',30)">👑 +30 dias</button>' +
    '<button onclick="premium(\\'' + c.email + '\\',90)">👑 +90</button>' +
    '<button onclick="premium(\\'' + c.email + '\\',365)">👑 +1 ano</button>' +
    '<button class="azul" onclick="baus(\\'' + c.email + '\\')">🎁 Baús</button>' +
    '<button class="cinza" onclick="copiar(\\'' + c.email + '\\')">📋 copiar e-mail</button>' +
    "</div></div>";
}
function esc(s) { return String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])); }
function desenhar() {
  const ag = DADOS.agora, dia = 86400000;
  const cs = DADOS.contas.map(c => ({ c, st: statusDe(c) }));
  const ativos7 = cs.filter(x => x.c.ultimaSync && (ag - new Date(x.c.ultimaSync).getTime()) < 7 * dia).length;
  const prem = cs.filter(x => x.st.id === "prem").length;
  const trial = cs.filter(x => x.st.id === "trial" || x.st.id === "hoje").length;
  const urg = cs.filter(x => x.st.pri <= 2);
  $("#stats").innerHTML =
    '<div class="card"><b>' + cs.length + "</b><small>contas</small></div>" +
    '<div class="card"><b>' + ativos7 + "</b><small>ativos (7 dias)</small></div>" +
    '<div class="card"><b>👑 ' + prem + "</b><small>premium</small></div>" +
    '<div class="card"><b>🎁 ' + trial + "</b><small>em trial</small></div>" +
    '<div class="card" style="border-color:var(--coral)"><b style="color:var(--coral)">🎯 ' + urg.length + "</b><small>pra chamar hoje</small></div>";
  urg.sort((a, b) => a.st.pri - b.st.pri || b.c.xp - a.c.xp);
  $("#chamar").innerHTML = urg.map(x => cartaoAluno(x.c, x.st)).join("") || '<p class="vazio">Ninguém urgente agora. 😎</p>';
  const q = ($("#busca").value || "").toLowerCase();
  const todos = cs.filter(x => !q || (x.c.nome || "").toLowerCase().includes(q) || x.c.email.includes(q));
  todos.sort((a, b) => new Date(b.c.ultimaSync || 0) - new Date(a.c.ultimaSync || 0));
  $("#qtd").textContent = "(" + todos.length + ")";
  $("#lista").innerHTML = todos.map(x => cartaoAluno(x.c, x.st)).join("") || '<p class="vazio">Nenhum aluno encontrado.</p>';
}
async function premium(email, dias) {
  if (!confirm("Ativar Premium por " + dias + " dias para\\n" + email + "?")) return;
  const r = await fetch("/api/premium?chave=" + encodeURIComponent(CHAVE) + "&email=" + encodeURIComponent(email) + "&dias=" + dias);
  const j = await r.json();
  alert(j.ok ? "👑 Premium ativado até " + new Date(j.premiumAte).toLocaleDateString("pt-BR") : "❌ " + (j.erro || "Erro"));
  entrar();
}
async function baus(email) {
  const qtd = parseInt(prompt("Quantos baús creditar pra " + email + "?", "50") || "0", 10);
  if (!qtd || qtd < 1) return;
  const r = await fetch("/api/creditar-baus?chave=" + encodeURIComponent(CHAVE) + "&email=" + encodeURIComponent(email) + "&qtd=" + qtd);
  const j = await r.json();
  alert(j.ok ? "🎁 +" + qtd + " baús (total " + j.totalComprados + ")" : "❌ " + (j.erro || "Erro"));
  entrar();
}
function copiar(t) { navigator.clipboard && navigator.clipboard.writeText(t); }
</script></body></html>`;

  /* ---------- ADMIN: ativar Premium (só o Andrio) ----------
     Configure ADMIN_CHAVE nas variáveis de ambiente do Render.
     Depois é só abrir no navegador:
     https://SEU-SITE.onrender.com/api/premium?chave=SUACHAVE&email=aluno@email.com&dias=30 */
  function ativarPremium(req, res) {
    const u = new URL(req.url, "http://x");
    const ADMIN = process.env.ADMIN_CHAVE || "";
    if (!ADMIN) return responder(res, 403, { erro: "Defina ADMIN_CHAVE nas variáveis do Render para usar esta rota." });
    if ((u.searchParams.get("chave") || "") !== ADMIN) return responder(res, 403, { erro: "Chave errada." });
    const email = (u.searchParams.get("email") || "").trim().toLowerCase();
    const dias = Math.max(1, Math.min(3650, parseInt(u.searchParams.get("dias") || "30", 10) || 30));
    const c = CONTAS[email];
    if (!c) return responder(res, 404, { erro: "Conta não encontrada: " + email });
    const base = (c.premiumAte && c.premiumAte > Date.now()) ? c.premiumAte : Date.now();
    c.premiumAte = base + dias * 86400000;
    persistir();
    log("👑 Premium ativado: " + email + " +" + dias + " dias (até " + new Date(c.premiumAte).toLocaleDateString("pt-BR") + ")");
    return responder(res, 200, { ok: true, email, dias, premiumAte: c.premiumAte, ate: new Date(c.premiumAte).toISOString() });
  }
