# V870 — 27/07/2026 — 💎 Diamantes por DOAÇÃO + ranking limpo (Parte 1)

**Responsável:** Claude (pedidos do Andrio: "tirar os efeitos automáticos
do primeiro colocado", "use o sistema de compra de diamantes e troca por
planos e baús" + "nunca pode existir a palavra compra — é tudo doação")
**Arquivos alterados:** index.html, server.js, sw.js

## 🏆 Ranking: 1º lugar SEM efeito automático
- Removidos: raios girando, pulso da borda, brilho da coroa, pulso do
  avatar e ✨ do 1º colocado — sobrou só a moldura dourada estática
- Efeito de verdade agora SÓ vem de borda/estandarte resgatado na Loja
  (célula compra=uso 100% respeitada)

## 💎 Diamantes — moeda premium por DOAÇÃO (como o h2bapply)
- **Doar**: pacotes 💎100/R$10 · 💎280/R$25 · 💎600/R$50 no MESMO fluxo
  do VIP: Pix + print do comprovante → OCR confere valor e data → credita
  sozinho (senão cai pra aprovação manual do Andrio; revogar ESTORNA os
  diamantes, nunca fica negativo)
- **Saldo mora no SERVIDOR** (`conta.diamantes`) — o navegador só exibe;
  impossível hackear pelo F12
- **Trocar** (`/api/diamantes/trocar`, catálogo server-side): VIP 7d=90 ·
  VIP 30d=300 · VIP 60d=500 · 1 baú=40 · 5 baús=180 · 600🌻=60 ·
  1.500🌻=130; cada troca logada em `conta.trocasDiamantes`
- Aba 💎 Diamantes na Loja: saldo, pacotes de doação e grade de trocas
  (botão desabilita se faltar saldo)

## 💝 Site inteiro fala DOAÇÃO — a palavra "compra" morreu
- Loja (todas as abas), paywall, conquista, roleta, WhatsApp dos baús e
  títulos: "Comprar" → "Doar 💝" (dinheiro) ou "Resgatar" (girassóis)
- Teste automático varre TODAS as abas da loja + paywall garantindo que
  compra/comprar não aparece (comprovante continua, é recibo)

## Testes executados (servidor real + Chromium mobile)
Pedido de diamantes criado → aprovado credita 100 ✓ · sync devolve saldo
✓ · troca baú (40) e girassóis (60) com carteira certa ✓ · sem saldo
recusa ✓ · item inválido/senha errada recusam ✓ · revogar estorna sem
negativo ✓ · aba 💎 renderiza saldo/pacotes/trocas ✓ · zero "compra" em
loja+paywall ✓ · 1º lugar sem animação ✓ · node --check (app+servidor) ✓.

sw.js: v56 → v57.
**Próximas partes**: P2 bordas 2000% (efeitos por elemento) + 50 ideias ·
P3 pets novos (packs abaixo) · P4 painel admin mostrando doações 💎.
