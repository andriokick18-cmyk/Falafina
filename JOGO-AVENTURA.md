# ⚔️ AVENTURA FALAFINA — projeto do grande jogo (RPG de exploração)

Visão do Andrio + estudo de design de RPG (loot tables com pesos tipo
"baralho de cartas", curva de dificuldade exponencial sincronizada com
áreas novas, equipamento amarrado a progresso visível — fontes:
gamedeveloper.com "Loot drop best practices", gamedesignskills.com/rpg).
Regra de ouro do projeto: **todo sistema serve pra ensinar inglês e fazer
a pessoa GOSTAR de voltar.**

## O jogo em uma frase
Um RPG 2D de exploração estilo Pokémon Red, em TELA CHEIA com analógico
touch, onde cada batalha é vencida ENTENDENDO inglês — e cada item
equipado dá mais DICAS pra te ajudar a responder.

## Núcleo (spec do Andrio)
- **Controle**: analógico virtual na tela (sprites do Mobile Controls) +
  setas do teclado no PC. Tela cheia de verdade (Fullscreen API).
- **Exploração**: personagem 2D top-down andando por mapas/fases,
  encontrando monstros e desvendando mistérios.
- **Batalha por perguntas**: falas misturam PORTUGUÊS e INGLÊS. Acertou →
  seu personagem ATACA. Errou → o monstro ataca VOCÊ.
- **Monstro fraco = 3 acertos pra derrotar.** Vida inicial: 3 corações.
- **Amuleto raríssimo** que aumenta a vida máxima PRA SEMPRE ao equipar —
  **dropa garantido no PRIMEIRO monstro** (pra pessoa saber que existe),
  depois vira raridade lendária (peso ~1 na tabela).
- **Poções de coração**: só dropam quando você TEM coração faltando
  (drop inteligente — nunca desperdiça). Vão pra MOCHILA; abre a mochila
  e usa quando quiser.
- **10 elementos de monstro** (um por mapa): 🌿 Planta → 💧 Água → 🔥 Fogo
  → ⚡ Raio → 🪨 Pedra → ❄️ Gelo → 🌪️ Vento → 🌑 Sombra → ✨ Luz → 🐉 Dragão.
  Mapa 11 = elemento 1 de novo, mas o monstro é ~10x mais forte
  (**5 acertos SEM errar** — modo perfeito, como o Andrio definiu).
- **Curva**: nível 10 ainda fácil; nível 100 muito difícil. Dificuldade
  das perguntas sobe por nível: palavras curtas → palavras longas →
  frases → frases só em inglês → escrever a resposta.
- **Equipamentos = DICAS**: espadas/escudos/anéis dropados dão poderes
  educativos — ver tabela abaixo. Quanto mais equipado, mais ajuda.

## Tabela de equipamentos (dica = poder)
| Item | Raridade | Poder |
|---|---|---|
| 🗡️ Espada de Madeira | comum | elimina 1 alternativa errada |
| 🛡️ Escudo de Couro | comum | 1º erro da batalha não tira coração (1x/batalha) |
| 📿 Amuleto Rubi | LENDÁRIO (1º kill garantido) | +1 coração máximo PRA SEMPRE |
| 🔮 Orbe do Eco | raro | ouvir a palavra falada (áudio) antes de responder |
| 📖 Livro do Viajante | raro | mostra o "como soa" escrito |
| ⚔️ Espada de Prata | épico | elimina 2 alternativas erradas |
| 👑 Coroa do Sábio | lendário | 1 resposta automática certa por batalha |

Drops por tabela de pesos (baralho): nada 55 · poção* 20 · equip comum
15 · raro 7 · épico 2,5 · lendário 0,5. (*poção só entra no baralho se
houver coração faltando.)

## Fases/mistérios
Cada mapa tem: monstros do elemento, 1 CHEFE (destrava o próximo mapa),
NPCs com falas PT/EN misturadas que dão pistas do mistério local (ex.:
"O baú está atrás da WATERFALL — você sabe o que é?"), baús escondidos.

## Roadmap de construção
- **v0** ✅ (V860): motor — tela cheia, analógico, colisão, encontro,
  batalha de 3 perguntas, amuleto no 1º kill, mochila com poção
- **v1** ✅ (V861): elementos + chefes + destravar mapas + tabela de
  drops completa + equipamentos-dica + tier 2 (modo perfeito) + frases
- **v2 (PRÓXIMA)**: SOM (packs rpg-audio/interface-sounds/music-jingles
  já recebidos) + NPCs/mistérios + baús escondidos + escrever respostas
  nos níveis altos + save de posição

## 📦 Packs que o Andrio precisa baixar (kenney.nl, grátis)
1. **Roguelike/RPG pack** — kenney.nl/assets/roguelike-rpg-pack (mapas top-down: cavernas, florestas, castelos)
2. **Roguelike Characters** — kenney.nl/assets/roguelike-characters (personagens com 4 direções de caminhada!)
3. **Tiny Dungeon** — kenney.nl/assets/tiny-dungeon (monstros 16px)
4. **Tiny Town** — kenney.nl/assets/tiny-town (vilas/overworld 16px)
5. **RPG Audio** — kenney.nl/assets/rpg-audio (sons de espada, poção, porta)
6. **Interface Sounds** — kenney.nl/assets/interface-sounds (cliques/acertos)
7. **Music Jingles** — kenney.nl/assets/music-jingles (vitória/derrota)
