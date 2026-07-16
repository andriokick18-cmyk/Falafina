# V835 — 17/07/2026 — 🛡️ Protetor de Sequência: o 🔥 não morre por 1 tropeço

**Responsável:** Claude (modo "Próximo")
**Arquivos alterados:** index.html, server.js, sw.js

## A tese
A sequência 🔥 é o motor do retorno diário — e perder ela é o gatilho
nº 1 de abandono em app de estudo ("perdi meus 15 dias, desisto").
Além disso, a economia de girassóis quase não tinha RALO (bordas/pets
são compra única) — moeda sem uso perde valor. O Protetor resolve os
dois: retenção + demanda permanente por 🌻.

## Como funciona
- **🌻 300 na Loja** (aba nova 🛡️ Protetor), máximo **2 em estoque**
- Faltou **exatamente 1 dia**? O protetor **age sozinho** no próximo
  estudo: consome 1 e a sequência continua (toast avisa: "🛡️ Seu
  Protetor salvou a sequência — 🔥 X dias continua viva!")
- Faltou 2+ dias? Nem ele salva (e NÃO é consumido) — justo e claro
- A Home mostra "🔥 12 dias 🛡️×2" — segurança visível
- Dica do Fininho nova promove o protetor pra quem tem sequência longa

## Merge à prova de tudo
`p.protetores = { comprados, usados }` — os dois só crescem → merge por
máximo no cliente E no servidor (mesmo padrão da carteira de girassóis).
Comprar num aparelho e usar noutro funciona; nada duplica nem some.

## Testes executados (runtime, Chromium — 0 erros de página)
Aba na Loja renderiza ✓ · compra 1 (🌻700→400) e 2 (→100) ✓ · 3ª compra
bloqueada no máximo ✓ · faltou 1 dia com 🛡️: sequência 5→6 salva,
consome 1 ✓ · faltou 2+ dias: reseta e NÃO consome ✓ · faltou 1 dia sem
🛡️: reseta ✓ · Home mostra 🛡️×1 ✓ · merge cliente pega os máximos ✓ ·
sintaxe index + server ✓.

sw.js: cache v22 → v23.
