# V847 — 19/07/2026 — 👑 Aba VIP na Loja (preços reais: R$30 / R$50)

**Responsável:** Claude (pedido direto do Andrio, com print da Loja: "na
loja tem que ter 30 dias de vip por 30 reais, 60 dias por 50 reais")
**Arquivos alterados:** index.html, sw.js

## O que mudou
- Preços de exemplo do V846 (`FF_PLANOS_VIP`) trocados pelos preços
  reais do Andrio: **30 dias — R$ 30** e **60 dias — R$ 50**
- Nova aba **"👑 VIP"** na Loja (primeira da lista, ao lado de Bordas/
  Pets/Efeitos/Baús/Protetor/Girassóis) com os dois planos e botão
  "Comprar" cada um
- Clicar em "Comprar" na Loja leva direto pra tela de Comprar VIP
  (Pix + upload do comprovante) **já com aquele plano selecionado** —
  a pessoa não precisa escolher de novo

## Testes executados (Chromium)
Cadastro real → abrir Loja → aba VIP mostra os 2 planos com os preços
certos ✓ · clique em "Comprar" no plano de 30 dias abre a tela de
checkout com "30 dias" já marcado como ativo ✓ · sem erros de página ✓.

sw.js: cache v33 → v34.
