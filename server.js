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
  r.cosmeticos = {
    tem: Object.assign({}, ca.tem || {}, cb.tem || {}),
    usando: Object.assign({}, ca.usando || {}, cb.usando || {}),
    ganhas: Math.max(ca.ganhas || 0, cb.ganhas || 0),
    gastas: Math.max(ca.gastas || 0, cb.gastas || 0)
  };
  r.medalhasPagas = Object.assign({}, a.medalhasPagas || {}, b.medalhasPagas || {});
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
        return {
          nome: String(c.nome || "Aluno").slice(0, 30),
          foto: (c.perfil && c.perfil.foto) || null,
          xp: c.progresso.xp || 0,
          diasSeguidos: c.progresso.diasSeguidos || 0,
          recorde: (c.progresso.escalada && c.progresso.escalada.recorde) || 1,
          desafios: Object.keys(c.progresso.resgates || {}).length,
          ritmo: (c.progresso.escalada && c.progresso.escalada.melhorRitmo) || null,
          borda: uso("borda"), pet: uso("pet"), efeito: uso("efeito"),
          voce: !!eu && c.email === eu
        };
      });
    return responder(res, 200, { ok: true, ranking: lista });
  }

  // Rota admin do Premium é GET (pra abrir direto no navegador do celular)
  if (rota.startsWith("/api/premium") && req.method === "GET") return ativarPremium(req, res);
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
    persistir();
    log("✨ Conta criada: " + email + " (total: " + Object.keys(CONTAS).length + ")");
    return responder(res, 200, { ok: true, conta: contaPublica(CONTAS[email]) });
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
