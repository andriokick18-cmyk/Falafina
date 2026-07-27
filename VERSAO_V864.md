# V864 — 27/07/2026 — 👾 Variedade de monstros + ✍️ modo ESCREVER (Nv60+)

**Responsável:** Claude (ordem do Andrio: "tudo. só pare quando estiver
limite do claude" — ciclo A do backlog)
**Arquivos alterados:** index.html, sw.js

## 👾 Cada elemento virou um ECOSSISTEMA
- 13 espécies do Tiny Dungeon mapeadas (rato, aranha, slime, morcego,
  fantasma, diabrete, ciclope, escorpião, zumbi, cavaleiro, mago, ogro,
  mímico)
- Cada elemento tem POOL de 3 espécies pros monstros comuns + um sprite
  próprio de CHEFE — nomes gerados como espécie + adjetivo do elemento:
  "Rato Verdejante", "Morcego Flamejante", "Cavaleiro Sombrio"…
- Fim da repetição visual: os 3 monstros do mapa são espécies diferentes

## ✍️ Escada de dificuldade completa (pedido original do Andrio)
- Nv1–7: palavras curtas · Nv8–17: médias · Nv18–29: qualquer palavra ·
  Nv30–59: FRASES inteiras · **Nv60+: ESCREVER a resposta** (sem
  alternativas — o teclado é a espada)
- Comparação ignora maiúsculas/espaços; errado mostra a resposta certa
- Equipamentos se ADAPTAM ao modo escrever: 🗡️/⚔️ espadas viram
  "revelar 1/2 letras", 🔮 orbe fala a palavra, 📖 livro mostra o som,
  👑 coroa responde sozinha — dica continua sendo poder

## Testes executados (Chromium mobile, servidor real)
Regressão v1.1 completa ✓ · mapa 21 (tier 3): monstros com 3 sprites
diferentes e nomes por espécie ✓ · Nv61 abre modo escrever ✓ · ⚔️ revela
2 letras ✓ · errado escrito: −1 ❤️ e monstro PERFEITO regenera ✓ · certo
escrito com CAPS+espaços aceita ✓ · 👑 coroa funciona no escrever ✓ ·
`node --check` ✓.

sw.js: cache v50 → v51.
