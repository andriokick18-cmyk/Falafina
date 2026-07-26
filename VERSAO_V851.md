# V851 — 26/07/2026 — 🛡️ Estandarte Medieval: o Banner de Prestígio virou brasão de guilda

**Responsável:** Claude (pedido direto do Andrio, com prints de referência do
Google Imagens: "quero sistema assim, medieval bonito atraente e
empolgante" — banners/estandartes de guilda com brasão e escudos, e
medalhas circulares com fita, no lugar do visual "energia mágica" da
versão anterior)
**Arquivos alterados:** index.html, sw.js

## O pivô: de "energia mágica" pra "heráldica medieval"
A V850 deixou o Ranking com um visual de aura/energia (bordas de plasma,
runas cintilando). O Andrio mandou referências de banners de guilda
medievais reais — estandartes pendurados numa haste, escudos com brasão,
fitas de medalha — e pediu esse estilo específico. O motor por trás
(tiers de XP, partículas, shader WebGL) continua o mesmo; o que mudou foi
a **moldura e os ornamentos**, agora heráldicos:

- **Haste dourada com pomos** no topo do pódio e do perfil — o estandarte
  literalmente pendura de uma barra, como um brasão de torneio
- **Brasão (escudo)** com o emblema do tier dentro (🎒🏕️💼🏠🇺🇸🦅🗣️🏭👷🕴️🌎🏆⛰️) —
  no pódio/perfil pendurado na haste; na lista, um escudo pequeno ao lado
  do avatar (todo mundo tem o seu, não só o topo 3)
- **Rebites dourados** cravados nos 4 cantos da moldura (troca das
  bordas angulares "tech" da versão anterior)
- **Rabicho** — a ponta do pano do estandarte pendendo por baixo do card,
  na cor do tier
- **Fundo de pergaminho** (creme envelhecido) com trim dourado animado,
  em vez do branco/energia da V850
- **Selo do tier** reformulado em forma de fita com pontas em V (listel
  de brasão), mantendo a correção de contraste da versão anterior

## 🏅 Medalhas das Conquistas também ganharam o tratamento
As medalhas da aba Conquistas (e do perfil público) deixaram de ser
caixinhas com ícone solto — agora são **badges circulares de metal**
(bronze/prata/ouro/diamante, com gradiente e brilho) com uma **fita
pendurada** por baixo, como uma medalha de verdade. Trancadas continuam
em cinza.

## Testes executados (Node + Chromium, servidor real)
`node --check` em server.js, sw.js e no script do index.html ✓ · Ranking
real (13 contas, todos os tiers): pódio com haste+escudo+rabicho ✓, lista
inteira com escudo pequeno junto do avatar em todas as 10 linhas ✓ · perfil
do tier mais alto (Imortal da Montanha): haste, escudo grande, rabicho,
selo legível, shader WebGL por trás ✓ · aba Conquistas: medalhas circulares
com fita, cores certas por metal, trancadas em cinza ✓ · zero erros de
JavaScript de página em toda a sessão de testes.

sw.js: cache v37 → v38.
