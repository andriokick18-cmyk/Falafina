# V855 — 26/07/2026 — 🏰 MASMORRA DAS PALAVRAS: o 1º jogo do FalaFina com sprites de verdade

**Responsável:** Claude (pedido direto do Andrio, que enviou 16 packs CC0 do
Kenney: "agora sim voce ja pode criar jogos usando tudo isso... vários jogos
focados em ensinar inglês! vamos criar o primeiro grande jogo... é você que
manda em tudo! XP e tudo mais!")
**Arquivos alterados:** index.html, sw.js, sprites/pico8.png (novo)

## O jogo
Canvas puro (sem engine externa — mesma filosofia zero-dependência do app),
usando o tilemap pico-8 do Kenney (CC0) fatiado em tempo real por índice:

- Você é o **herói de pixel** numa masmorra de **10 salas**
- Cada sala: **3 portas** numeradas; o jogo pergunta uma palavra em
  português e você toca no botão da porta com a tradução certa em inglês
- **Certa** → a porta abre, o herói atravessa, ⭐ estrela sobe, o app FALA
  a palavra em inglês (áudio nativo)
- **Errada** → um monstro salta da porta, ❤️→💔 no HUD (3 corações), e um
  toast ensina a resposta certa com o "como soa"
- Corações zerados = fim da corrida; 10 salas completas = vitória;
  **10/10 sem errar = "Rei da Masmorra"** 👑 + 🌻 15 girassóis

## Integração total com o resto do app (a "célula" continua)
- Palavras vêm do **LEX_CORPUS** (mesmas 780 palavras do Jardim)
- Cada resposta alimenta a habilidade 🔤 **Vocabulário** (ENGINE)
- XP entra por **registrarAtividade** (6 XP/porta) — respeita teto do
  modo grátis e missões do dia
- Cota do modo grátis: **podeIniciarTarefaGratis()** no início
- Entrou na lista oficial de jogos (hub, tutorial de 1ª vez, "Fininho
  recomenda", barra de habilidades)

## Técnica
- `sprites/pico8.png` (1,5 KB!) é o tilemap inteiro; o jogo desenha cada
  tile com drawImage por índice — nada de 300 arquivos
- Tiles do chão escolhidos por **análise de cor programática** (achar
  tiles 100% opacos sem cor quente) depois que o palpite visual errou
- Canvas 240x150 esticado com image-rendering:pixelated (nítido em
  qualquer tela); loop em requestAnimationFrame; para sozinho no fim
- sw.js pré-cacheia o tilemap → o jogo funciona offline

## Testes executados (Node + Chromium, servidor real)
Playthrough completo automatizado: hub mostra o jogo ✓ tutorial na 1ª vez
✓ 10 salas jogadas com 1 erro proposital ✓ monstro + coração quebrado no
erro ✓ porta abre + estrela no acerto ✓ tela final com placar ✓ XP do dia
registrado (54) ✓ habilidade vocab alimentada ✓ zero erros de página ✓
chão corrigido e verificado em screenshot ✓.

sw.js: cache v41 → v42 (pré-cache do tilemap).
