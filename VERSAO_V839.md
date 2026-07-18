# V839 — 18/07/2026 — 📌 Palavra do Dia (ideia do Andrio, vinda do print do lock screen)

**Responsável:** Claude (ideia original: Andrio — palavra nova em inglês
na tela de bloqueio, "palavras grandes, não as comuns", com frase EN+PT)
**Arquivos alterados:** index.html, sw.js

## A verdade técnica (registrada pra não se perder)
Palavra NA TELA DE BLOQUEIO de verdade = só com APP NATIVO Android
(site/PWA não tem permissão de desenhar ali — nenhum site consegue).
O caminho real em 3 etapas:
1. **HOJE (esta versão):** Palavra do Dia dentro do app, em destaque
2. **Próxima etapa:** notificação push diária — notificação APARECE na
   tela de bloqueio, é o mais perto do print que a web permite
   (precisa de infra de push no servidor: VAPID + assinaturas + agenda)
3. **Futuro:** app nativo com widget de tela de bloqueio

## O que entrou
Card **📌 Palavra do Dia** no topo da Home (logo abaixo do próximo passo):
- Pool curado de **48 palavras DE IMPACTO** (reliable, opportunity,
  perseverance, trustworthy, breakthrough...) — zero hi/yes
- Palavra GRANDE + 🗣️ como soa + 🇧🇷 significado + frase de exemplo
  em inglês (com 🔊) e português — "nada grande", como pedido
- **Mesma palavra pra todo mundo no mesmo dia** (determinística pela
  data) — vira assunto no grupo do WhatsApp
- **🔀 Ver outra**: troca na hora, quantas vezes quiser (o espírito do
  "muda a cada desbloqueio", dentro do app)
- **📣 Mandar pro grupo**: compartilha a palavra formatada com o link
  do app — cada palavra do dia é uma isca de divulgação

## Testes executados (Chromium — 7 checagens, 0 erros de página)
Card na Home ✓ · pool 48 itens completos (en/som/pt/frase EN/PT) ✓ ·
determinística no dia ✓ · "Ver outra" troca ✓ · compartilhar abre
WhatsApp com palavra + link ✓ · como soa + frase visíveis ✓.

sw.js: cache v26 → v27.
