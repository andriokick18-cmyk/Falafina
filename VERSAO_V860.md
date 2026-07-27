# V860 — 26/07/2026 — ⚔️ AVENTURA FALAFINA v0: nasce o RPG de exploração

**Responsável:** Claude (visão completa ditada pelo Andrio: RPG 2D estilo
Pokémon Red em tela cheia com analógico touch, batalhas por perguntas
PT/EN, 3 corações, amuleto raro que aumenta vida pra sempre dropando no
1º monstro, poções só pra corações faltando, mochila, equipamentos que
dão dicas, 10 elementos com ciclo 10x mais forte... + "estude mais de
100 tipos de RPG na internet")
**Arquivos alterados:** index.html, sw.js, JOGO-AVENTURA.md (novo),
sprites/cidade.png, sprites/stick-pad.png, sprites/stick-nub.png

## 📜 O projeto (JOGO-AVENTURA.md)
Estudo de design de RPG feito (loot tables com pesos "baralho de cartas",
curva exponencial sincronizada com áreas novas, equipamento amarrado a
poder VISÍVEL — adaptado pro nosso caso: equipamento = DICA educativa).
O documento registra a visão completa do Andrio + tabela de equipamentos
+ tabela de drops + roadmap v0→v3 + lista de packs pra baixar.

## 🕹️ O que a v0 já entrega (jogável AGORA)
- **Tela cheia de verdade** (Fullscreen API, botão ⛶) com canvas
  responsivo em escala inteira (pixel perfeito)
- **Analógico touch** com os sprites do Kenney Mobile Controls (pad +
  nub, arrasto com raio limitado) + setas/WASD no PC
- **Mundo top-down** (Praça dos Ecos): mapa 28x18 GERADO POR CÓDIGO
  (grama, água na borda, estradas em cruz, pracinha de areia, árvores
  sólidas com colisão, flores), câmera que segue e centraliza
- **Personagem animado** (3 frames de caminhada, espelha ao virar)
- **3 monstros no mapa** (Nv1/2/3 com plaquinha) — encostou, batalha!
- **Batalha por perguntas**: falas misturando PT/EN ("Só passa quem
  sabe... o que é MERCADO in English?"), 3 acertos derrotam; erro = o
  monstro ataca (perde ❤️); vitória fala a palavra em inglês
- **📿 Amuleto Rubi**: dropa GARANTIDO no primeiro monstro da vida —
  +1 coração máximo PRA SEMPRE (persiste e sincroniza)
- **🧪 Poções**: só dropam com coração faltando (55%); vão pra 🎒
  Mochila (botão no HUD) — abre, vê o amuleto equipado, usa poção
- **Derrota**: tela de renascimento na praça com corações cheios
- XP/ENGINE/cota integrados como nos outros jogos

## Testes executados (Node + Chromium, servidor real)
Hub mostra o jogo ✓ tutorial ✓ mundo carrega (canvas+stick) ✓ movimento
por teclado ✓ colisão ✓ batalha inicia por proximidade ✓ 3 acertos →
vitória ✓ Amuleto Rubi no 1º kill (+1 ❤️ máx persistido) ✓ mochila
mostra amuleto equipado ✓ mapa programático sem falhas de tile ✓ zero
erros de página ✓.

sw.js: cache v46 → v47.
