# V861 — 27/07/2026 — ⚔️ AVENTURA v1: elementos, chefes, mapas e equipamentos-DICA

**Responsável:** Claude (pedido direto do Andrio: "pode começar o v1 e nao
precisa te som no game" — o som fica pra v2, packs de áudio já recebidos)
**Arquivos alterados:** index.html, sw.js, sprites/dungeon.png (novo — Kenney
Tiny Dungeon, CC0), JOGO-AVENTURA.md (roadmap)

## 🗺️ O mundo cresceu: mapas infinitos por ELEMENTO
- **Tela de mapas**: a Aventura agora abre num mapa-múndi — cada mapa
  mostra o elemento, o monstro local (sprite real do Tiny Dungeon), a
  faixa de nível e o cadeado dos que faltam destravar
- **10 elementos em ciclo** (🌿💧🔥⚡🪨❄️🌪️🌑✨🐉), um por mapa, cada um com
  um monstro próprio do Tiny Dungeon (Slime Verdejante, Fantasma das
  Marés, Diabrete Flamejante, Escorpião Faiscante…)
- **4 temas visuais** rodam entre os mapas (Campo, Costa, Caverna,
  Cidade) com terreno GERADO por semente determinística — cada mapa tem
  layout próprio de árvores, flores, caminhos e areia (tiles verificados
  do pico-8 City + tilemap da Masmorra)
- **Mapa 11+ = TIER 2**: o ciclo volta ao elemento 1, mas os monstros
  são ⭐ PERFEITOS — errou qualquer pergunta, o monstro se REGENERA
  (regra do Andrio: "tem que acertar 5 pra matar ele e nao errar")

## 👑 CHEFES que destravam o mundo
- Cada mapa tem 3 monstros comuns + 1 CHEFE (maior, com estrela e HP 5+)
- Derrotar o CHEFE **destrava o próximo mapa** e oferece a viagem na
  hora — o loop continua rodando, só o mundo troca (sem sair da tela
  cheia)
- Área limpa sem o chefe morto? O jogo avisa: "só falta o 👑 CHEFE"

## ⚔️ EQUIPAMENTOS = DICAS (drops por baralho de pesos)
Tabela do JOGO-AVENTURA.md, agora 100% no jogo:
- 🗡️ Espada de Madeira (comum) — corta 1 alternativa errada (1x/batalha)
- 🛡️ Escudo de Couro (comum) — o 1º erro da batalha não tira coração
- 🔮 Orbe do Eco (raro) — ouça a resposta falada em inglês
- 📖 Livro do Viajante (raro) — mostra o "como soa" escrito
- ⚔️ Espada de Prata (épico) — corta 2 alternativas erradas
- 👑 Coroa do Sábio (lendário) — 1 resposta automática certa por batalha
- Pesos do baralho: nada 55 · poção 20 (só com ❤️ faltando) · comum 15 ·
  raro 7 · épico 2,5 · lendário 0,5 — e só dropa o que ainda falta
- 📿 Amuleto Rubi continua GARANTIDO no 1º monstro (+1 ❤️ pra sempre)
- 🎒 Mochila nova: mostra os 6 equipamentos (os que faltam aparecem como
  "???" com a raridade — meta visível pra caçar)

## 📈 Dificuldade que sobe com o nível do monstro
- Nv baixo: palavras curtas → Nv 8+: palavras médias → Nv 18+: qualquer
  palavra → **Nv 30+: FRASES inteiras** (pool da Palavra do Dia)
- Monstros do mapa m: Nv (m-1)*3+1 até (m-1)*3+3; chefe Nv m*3+1 —
  no mapa 34 as batalhas chegam ao Nv 100 (pedido: "lá pelo monstro de
  nv 100 fica muito difícil")

## 🐛 Consertos de sprite (verificação visual tile a tile)
- Herói andava com frames 308–310 e o frame 3 era… um ARBUSTO 🌳 —
  frames corretos são 307/308/309
- "Árvore" tile 7 era pedaço de litoral — árvores de verdade: 358
  (Campo), 359 (Costa), 334 (Cidade), arbusto 310 como detalhe da Costa

## Testes executados (Node + Chromium, servidor real)
Tela de mapas (1 aberto, 2 trancado) ✓ · entrar no mapa 1 (Campo/Planta,
4 monstros, 4 ❤️ com amuleto) ✓ · mochila com 6 equips + poções ✓ ·
batalha: ⚔️ Cortar 2 deixa 1 opção ✓ · 📖/🔮/👑 presentes ✓ · 🛡️ escudo
absorve o 1º erro e o 2º tira coração ✓ · vitória + drop ✓ · área limpa
avisa do CHEFE ✓ · chefe morto → "DESTRAVADO" + mapaMax=2 ✓ · viajar →
mapa 2 (Costa/Água, Nv 4–7) com o herói andando ✓ · sair → tela de mapas
com o 2 aberto ✓ · mapa 11: tier 2, ⭐ PERFEITO, HP 5, regenera ao errar
✓ · `node --check` ✓ · zero erros de página (além de fontes bloqueadas
no sandbox).

sw.js: cache v47 → v48 (pré-cache de sprites/cidade.png e dungeon.png).
Próximo (v2): SOM (packs já recebidos), NPCs/mistérios, baús escondidos,
escrever a resposta nos níveis altos, save de posição.
