# V867 — 27/07/2026 — 🌋 4 biomas novos (Roguelike RPG pack)

**Responsável:** Claude (ciclo D do "tudo até o limite": mundo com mais
variedade — pack Roguelike do Kenney finalmente em uso)
**Arquivos alterados:** index.html, sw.js, sprites/roguelike.png (novo,
94KB, CC0, 57 col × 16px com margem de 1px — stride 17)

## 🌍 De 4 pra 8 temas visuais
Novos (tiles verificados um a um na folha):
- 🌲 **Floresta** (Planta): grama viçosa, pinheiros, trilhas de terra,
  capim — o mapa 1 agora é uma floresta de verdade
- 🏜️ **Deserto** (Luz): areia clara, CACTOS, estradas de terra
- 🌋 **Vulcão** (Fogo e Dragão): terra escura, poças de LAVA borbulhando
  (sólidas — perigo visual), árvores mortas, borda de lava
- 🔮 **Místico** (Sombra): chão roxo com gemas cravadas e pinheiros
  escuros

Continuam: Campo (Vento), Costa (Água/Gelo), Caverna (Pedra),
Cidade (Raio). Cada elemento tem seu bioma — viajar de mapa é sempre
uma paisagem nova.

## Motor
- AVT carrega sprites/roguelike.png; `tileRog()` fatia com stride 17
  (16px + 1px de margem, spec da folha)
- AV_TEMAS aceita `rog:` (chão) e `sobreRog:` (enfeite por cima) —
  compõe com os packs antigos (cid/pic) sem quebrar nada

## Testes executados (Chromium mobile, servidor real)
Regressão v1.1 completa ✓ · mapas 1/3/8/9 renderizam Floresta/Vulcão/
Místico/Deserto ✓ (screenshots conferidos: cactos, lava, gemas,
pinheiros todos visíveis e distintos) · `node --check` ✓.

sw.js: cache v53 → v54 (pré-cache do roguelike.png).
