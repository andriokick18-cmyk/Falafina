# V857 — 26/07/2026 — 🗼 A TORRE: progressão infinita + Baús da Torre por tier

**Responsável:** Claude (ideia do Andrio: "cada final de masmorra tem que
mostrar uma tela dele subindo a masmorra... tantos andares tipo 20 andares
ele ganha 1 baú, tipos de baús diferentes, tipo lvl 500 masmorra ganha um
baú lendário com mais chance de itens")
**Arquivos alterados:** index.html, server.js, sw.js

## 🗼 A Torre — o "pra sempre" do jogo
- **Cada porta certa = 1 andar subido, PRA SEMPRE** (progresso monotônico,
  sincroniza entre aparelhos sem nunca regredir — merge por Math.max no
  cliente E no servidor)
- No fim de toda corrida: **tela da subida** — o herói escala a parede de
  pedra da torre no canvas (céu estrelado, marcos numerados a cada 5
  andares), o contador gira do andar antigo até o novo
- Intro do jogo agora mostra 🗼 Andar atual + explica a regra dos baús

## 🎁 Baús da Torre — a cada 20 andares, tier pela altura
| Andar | Baú | Recompensas |
|---|---|---|
| < 100 | 🟫 Baú de Madeira | 🌻 30–60 |
| 100+ | ⬜ Baú de Prata | 🌻 70–120 · 20% de +1 baú |
| 250+ | 🟨 Baú de Ouro | 🌻 150–250 · +1 baú · 15% de ITEM da Loja |
| 500+ | 👑 Baú LENDÁRIO | 🌻 350–600 · +2 baús · 35% de item (qualquer um, até os de nível) |

- O item dropado é uma borda/Estandarte que a pessoa NÃO tem — cai
  direto no inventário ("já é seu — equipe na Loja!")
- Máx. 1 baú por corrida (10 andares < 20) — ritmo de recompensa saudável
- O baú aparece NA tela da torre com o sprite de baú nosso, chacoalhando,
  com brilho da cor do tier; abrir mostra a recompensa com chuva de ✨

## Testes executados (Node + Chromium, servidor real)
Progresso forçado pro andar 19 → corrida perfeita → tela da Torre com
subida animada ✓ contador 19→29 ✓ "MARCO DE 20 ANDARES" + Baú de Madeira
✓ abrir pagou girassóis de verdade (saldo conferido antes/depois) ✓
placar final com "Andar 29 da Torre" ✓ intro mostra andar salvo ✓
masDados().andar=29, bausTorre=1 persistidos ✓ `node --check` em
index/server/sw ✓ zero erros de página.

sw.js: cache v43 → v44.
