# V865 — 27/07/2026 — 🕵️ NPCs com mistério PT/EN + baús secretos

**Responsável:** Claude (ciclo B do "tudo até o limite" — mistérios que o
Andrio pediu no spec original do jogo: "desvendar mistérios… falas com
palavras em português e inglês misturadas")
**Arquivos alterados:** index.html, sw.js

## 🕵️ O morador do mapa
- 5 NPCs do Tiny Dungeon rodando por mapa: Aldeão Tobias, Princesa Lia,
  Anciã Vó Zilda, Viking Olaf e Elfo Ren — flutuando com balão "?"
  enquanto o mistério está aberto
- Conversa por proximidade com histerese (precisa se afastar pra
  reabrir — nada de diálogo em loop)

## 🧰 O mistério do baú (aprender direção EM INGLÊS)
- Cada mapa esconde um treasure chest num dos 4 lados — a 1ª fala dá a
  dica SÓ EM INGLÊS: "Escondi um treasure chest no lado NORTH…
  *Do you know where north is?*" — entender é o enigma
- Falou de novo? O NPC traduz ("north quer dizer o NORTE, lá em cima") —
  ninguém fica travado, mas quem sabe inglês chega primeiro
- O baú (sprite fechado) só APARECE no mapa depois da dica; ao pisar
  nele: 🌻10 + 1 poção pra mochila, som de drop — **1x por mapa,
  pra sempre** (`aventura.bauAchado[mapa]`, sem farm)
- Baú achado vira sprite aberto; NPC parabeniza em inglês
  ("You found my treasure!") e aponta pro CHEFE
- Direções rodam por mapa (north→south→east→west) — o jogador aprende
  as 4 sem perceber

## Testes executados (Chromium mobile, servidor real)
Regressão completa v1.1 ✓ · baú invisível e não-coletável antes da dica
✓ · 1ª fala só em inglês (sem NORTE) ✓ · 2ª fala traduz ✓ · coleta:
+🌻10 exatos + 1 poção ✓ · re-pisar não farma ✓ · NPC pós-baú
parabeniza ✓ · mapa 2: NPC (Princesa Lia) e direção (south) variam ✓ ·
`node --check` ✓.

sw.js: cache v51 → v52.
