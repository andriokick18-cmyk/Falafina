# V840 — 18/07/2026 — 🔔 Palavra do Dia na TELA DE BLOQUEIO (push diária, 9h)

**Responsável:** Claude (etapa 2 da ideia do Andrio — a V839 pôs a palavra
no app; esta a leva pra tela de bloqueio via notificação push)
**Arquivos alterados:** index.html, server.js, sw.js, package.json

## Como funciona
1. Aluno toca **"🔔 Receber todo dia na tela de bloqueio"** (no card da
   Palavra do Dia ou em Configurações) → navegador pede permissão →
   assinatura de push fica salva NA CONTA do aluno (autenticada)
2. Todo dia **~9h de Brasília**, o servidor envia pra todos os
   assinantes: *"📌 Palavra do Dia: PERSEVERANCE — 🗣️ pêrsevírans =
   perseverança + frase EN/PT"* — a notificação **aparece na tela de
   bloqueio** (Android/Chrome; iPhone precisa do app instalado na tela
   de início, iOS 16.4+)
3. Tocar na notificação abre o FalaFina

## Engenharia
- **Fonte única:** o servidor lê o pool de 48 palavras DIRETO do
  index.html (mesmo hash de data → mesma palavra no app e na push)
- **Chaves VAPID auto-geradas** no 1º boot e salvas em /data — zero
  configuração manual
- **Tolerante a falha:** sem a dependência `web-push` instalada o
  servidor NÃO quebra — push desativa com log explicando; /api/push/chave
  responde erro amigável; o botão do app avisa com toast
- Assinaturas mortas (404/410) são limpas automaticamente no envio
- Rotas: GET /api/push/chave · POST /api/push/assinar|sair (autenticadas)
  · GET /api/push/testar?chave=ADMIN (dispara AGORA — teste no celular)
- sw.js: handlers de `push` e `notificationclick`; cache v28
- Bônus: registro do SW reforçado (idempotente) também em localhost

## ⚠️ AÇÃO DO ANDRIO NO RENDER (1 minuto, uma vez só)
1. package.json agora tem a dependência `web-push` — no Render, confira
   que o **Build Command** é `npm install` (padrão de serviço Node).
   Se estiver vazio, coloque `npm install`.
2. Depois do deploy, TESTE no seu celular: abra o site no Chrome →
   Início → card Palavra do Dia → "🔔 Receber todo dia" → aceite.
   Aí abra `https://falafina.onrender.com/api/push/testar?chave=SUA_CHAVE`
   → a notificação chega na hora. Bloqueie o celular e veja na tela. 🎉

## Testes executados (servidor Node real + Chromium — 0 erros)
Chaves VAPID geradas e persistidas ✓ · pool lido do index.html (48) ✓ ·
assinar com senha errada = 401 ✓ · assinar ok ✓ · /api/push/testar envia
e responde contagem ✓ · SEM web-push: servidor sobe, site no ar, rota
responde erro amigável ✓ · botão no card + linha em Configurações ✓ ·
clique degrada com toast claro quando o navegador não suporta ✓.
(O aparecer na tela de bloqueio em si só é testável em celular real —
roteiro acima.)
