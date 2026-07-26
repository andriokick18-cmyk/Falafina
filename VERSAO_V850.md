# V850 — 26/07/2026 — 👑 Sistema de Prestígio: Ranking nível AAA de RPG

**Responsável:** Claude (pedido direto do Andrio, com fotos do site ao vivo:
"o site está feio, ranking não tem oq eu pedi... quero um visual AAA, no
nível de jogos como World of Warcraft, Diablo IV, League of Legends, Lost
Ark, Black Desert e Path of Exile... cada jogador deve possuir um Banner
de Prestígio, que funciona como uma skin rara")
**Arquivos alterados:** index.html, sw.js

## 👑 Banner de Prestígio — todo jogador tem o seu
13 tiers de prestígio (os mesmos títulos que já existiam por XP — de
🎒 Turista até ⛰️ Imortal da Montanha), cada um com paleta, tema e
partícula próprios: lona → couro → ferro → cobre → prata → ouro →
cristal → esmeralda → rubi → safira → aurora → mítico → supremo. Quanto
mais XP, mais grandioso o banner — igual progressão de MMO.

O banner aparece em **TODO lugar que mostra um jogador**, como pedido:
- **Lista inteira do Ranking** (todos os 50+, não só o topo)
- **Pódio** (top 3, combinado com a coroa/medalhas que já existiam)
- **Perfil aberto** (modal, versão grande — o "uau" principal)

Cada banner tem, de verdade (não CSS básico):
- **Moldura com cantos esculpidos** (recortes em ângulo, cor do tier)
- **Borda de energia animada fluindo** (gradiente cônico em movimento)
- **Runas brilhantes reais** (glifos rúnicos Unicode — Elder Futhark —
  cintilando fora de fase, quantidade cresce com o tier)
- **Profundidade**: camada de brilho borrada "respirando" atrás do card
- **Reflexo cinematográfico**: um brilho diagonal varrendo o card (efeito
  clássico de item lendário de jogo)
- **Selo do tier** com o nome do prestígio
- No **perfil aberto**: fragmentos flutuando (mais deles quanto mais
  medalhas a pessoa tem) + **shader WebGL de verdade** (ruído procedural
  animado nas cores do tier) por trás do banner

## ⚡ Partículas de verdade, em TODOS os cards
Em vez de um canvas por card (o navegador trava com muitos contextos), um
**motor único de partículas** (`RPGFX`) lê a posição de cada card visível
na tela e desenha por cima: poeira, faíscas, brilho, fragmentos dourados,
cristais, folhas, brasas, raios, aurora, cosmos — a partícula certa pro
tema de cada tier. Um `IntersectionObserver` garante que só quem está na
tela gasta ciclo de partícula, e o motor **desliga sozinho** quando não
há nada visível (sai do Ranking → economiza bateria) e **religa sozinho**
na volta.

## 🔥 WebGL de verdade no perfil
O modal de perfil (só um aberto por vez, sem risco de estourar limite de
contextos do navegador) roda um **shader WebGL escrito à mão** — ruído
procedural animado, nas duas cores do tier da pessoa — atrás do banner.
Se o aparelho não suportar WebGL, nada quebra: o CSS sozinho já deixa o
banner bonito (degradação segura).

## Decisão técnica: onde cada camada "pesada" entra
O Andrio pediu o efeito máximo em todos os cards, aceitando o risco de
performance — a decisão de engenharia foi entregar isso com **um canvas
2D compartilhado** pras partículas (todo card participa, custo de um só)
e reservar o **WebGL** pro perfil aberto (só um de cada vez, sem limite
de contexto). Filtros SVG pesados (metal gravado, refração de cristal)
ficam só no banner grande do perfil — a lista inteira já usa gradientes/
sombras/blend modes que rodam bem em qualquer aparelho.

## 🐛 Correções feitas durante o teste
- O frame de prestígio seria sobrescrito pelas regras antigas de `.pd`/
  `.rank-item` (especificidade CSS) — resolvido com `!important` nas
  propriedades do frame.
- Profundidade/reflexo usavam `::before`/`::after`, que colidiam com os
  efeitos `fx-*` que o aluno já comprou na Loja (fogo, raios, trono...) —
  trocado por elementos reais, sem conflito.
- Selo do tier ficava ilegível em tiers claros (Prata, Imortal): texto
  branco sobre fundo quase-branco. Corrigido misturando a cor do tier com
  uma base escura no degradê do selo.

## Testes executados (Node + Chromium, servidor real)
`node --check` em server.js, sw.js e no script do index.html ✓ · 13
contas semeadas cobrindo todos os tiers (50 XP a 8.000.000 XP) ✓ ·
Ranking real no Chromium: pódio e lista inteira com frame de prestígio
✓ · canvas de partículas desenhando pixels de verdade ✓ · perfil aberto
mostra banner hero + shader WebGL com contexto válido ✓ · animação
confirmada (2 capturas com 1.2s de intervalo mostram o reflexo em
posições diferentes) ✓ · selo legível em todos os tiers testados
(mítico, imortal, prata) após a correção de contraste ✓ · zero erros de
JavaScript de página em toda a sessão de testes.

sw.js: cache v36 → v37.
