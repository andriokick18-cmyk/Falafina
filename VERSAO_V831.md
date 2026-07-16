# V831 — 16/07/2026 — 🎛️ Painel do Dono (/admin): o negócio na palma da mão

**Responsável:** Claude (modo "Próximo")
**Arquivos alterados:** server.js, sw.js

## A tese
O Andrio É o processador de pagamentos do FalaFina (ativação manual via
WhatsApp) — mas administrava tudo às cegas, digitando URLs na mão
(`/api/premium?chave=...&email=...`) e sem saber quem estava em trial,
quem expirava hoje, quem era premium. Receita que depende de follow-up
manual precisa de uma lista de "quem chamar hoje". Agora tem.

## O que entrou

### `/admin` — Painel do Dono (celular-first, zero dependências)
Protegido pela mesma `ADMIN_CHAVE` já usada nas rotas de premium/baús
(a página em si não contém dado nenhum; tudo vem da API com chave).
- **Visão geral:** total de contas · ativos nos últimos 7 dias ·
  👑 premium ativos · 🎁 em trial · 🎯 "pra chamar hoje"
- **🎯 Quem chamar HOJE:** trial no último dia/acabando hoje +
  expirados há ≤7 dias que têm XP (os mais quentes pra converter),
  ordenados por urgência e engajamento
- **Lista completa** com busca por nome/e-mail, status colorido
  (🔴 acaba hoje · ⏳ último dia · 🎁 trial · 👑 premium · 🔒 expirado ·
  ✨ novo) e métricas por aluno (XP, sequência, aulas, temporada da
  Carreira, última visita)
- **Ações em 1 toque:** 👑 +30/+90/+365 dias de Premium · 🎁 creditar
  baús · 📋 copiar e-mail — usando as rotas admin já existentes
- Chave fica salva no aparelho do dono (localStorage) — entra 1 vez

### API nova: `GET /api/admin/dados?chave=...`
Projeção explícita das contas SEM senha/hash (email, nome, criadaEm,
ultimaSync, premiumAte, xp, sequências, trialInicio, temporada, aulas,
baús comprados). 403 sem chave ou com chave errada.

### sw.js
`/admin` nunca é cacheado pelo service worker (junto com `/api/*`);
cache v18 → v19.

## Como usar (Andrio)
1. No Render, confira que a variável `ADMIN_CHAVE` está definida.
2. Abra `https://SEU-SITE.onrender.com/admin` no celular.
3. Digite a chave uma vez → painel salvo. Chegou pagamento? Toca 👑.
   Todo dia de manhã: olha o "🎯 pra chamar hoje" e manda mensagem.

## Testes executados (servidor local + Chromium — 0 erros)
403 sem chave e com chave errada ✓ · dados corretos com chave ✓ ·
/admin serve a página ✓ · site normal continua servindo ✓ · painel
renderiza 5 contas seed com status certos (acaba hoje / último dia /
expirado ativo / premium / novo) ✓ · "quem chamar hoje" prioriza certo ✓ ·
busca filtra ✓ · botão 👑 +30 ativa premium de verdade e o painel
atualiza ✓ · sintaxe server.js ✓.
