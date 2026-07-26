# V858 — 26/07/2026 — 🎰 Roleta Diária de Login (no lugar do baú grátis)

**Responsável:** Claude (ideia do Andrio: "quando o usuário faz login diário
em vez do baú coloque uma roleta... 100 ou 200 girassóis, 3/7/30 dias de
VIP, tudo aplicado direto na conta, tudo salvo em logs, garantir 1x por
dia! a chance de 30 dias é 1 em 1 milhão, 7 dias 1 em 50k, os outros você
decide")
**Arquivos alterados:** index.html, server.js, sw.js

## 🎰 A roda
Canvas 8 gomos (🎁 BAÚ ×3 · 🌻100 · 🌻200 · 🌻40 · 👑 VIP ×2), aro
dourado, Fininho no cubo, ponteiro vermelho. Gira 5 voltas com easing de
suspense e para EXATAMENTE no gomo do prêmio sorteado. Prêmio → botão
"RECEBER ✔" (baú → "RECEBER E ABRIR 🎁", que já abre o baú na sequência).
Faixas na Home e na Loja mostram "🎰 Roleta Diária pronta!" até o giro do
dia; depois voltam ao modo estoque de baús.

## 🔒 Segurança: TUDO no servidor (o detalhe que faltava no pedido)
Se o sorteio rodasse no navegador, qualquer pessoa com F12 se daria 30
dias de VIP. Então: `POST /api/roleta/girar` (autenticado) — o SERVIDOR
sorteia, aplica o prêmio na conta na hora (girassóis/baú na carteira
monotônica; VIP estende `premiumAte`), grava o log e devolve o resultado.
O navegador só anima a roda parando no gomo certo.

## Chances (validadas com 1 milhão de giros simulados)
| Prêmio | Chance |
|---|---|
| 🎁 1 Baú | 45% (o mais comum, como pedido) |
| 🌻 40 (consolação) | ~29,95% |
| 🌻 100 | 18% |
| 🌻 200 | 7% |
| 👑 VIP 3 dias | 1/2.000 |
| 👑 VIP 7 dias | 1/50.000 |
| 👑 VIP 30 dias | 1/1.000.000 |

## 🗓️ 1x por dia garantido + logs
- Trava no servidor por dia de Brasília (`c.roleta.ultimoDia`); segundo
  giro → HTTP 429. Cliente espelha a trava localmente pra UX
- **Logs**: histórico dos últimos 90 giros gravado NA CONTA
  (`c.roleta.historico`: dia, prêmio, timestamp) + linha no log do
  servidor a cada giro ("🎰 Roleta: email → prêmio")

## 🐛 Bug pego no teste: prêmio dobrado
A sincronização automática podia trazer o prêmio do servidor ANTES do
clique em RECEBER — e o espelho local somava de novo (40 virava 80).
Correção: o servidor devolve os TOTAIS pós-prêmio e o cliente iguala por
`Math.max` (nunca soma). Retestado: aplicado exatamente 1x.

## Testes executados (Node + Chromium, servidor real)
Distribuição de 1M giros bate com a tabela ✓ · giro 1 premia e loga ✓ ·
giro 2 no mesmo dia → 429 ✓ · navegador: faixa 🎰 na Home → modal → roda
gira e para no gomo do prêmio ✓ · RECEBER aplica exatamente 1x ✓ · faixa
volta ao modo estoque ✓ · segundo giro bloqueado com aviso ✓ · zero erros
de página ✓.

sw.js: cache v44 → v45.
