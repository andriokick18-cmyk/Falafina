# V863 — 27/07/2026 — 🔊 SOM na Aventura (chiptune 8-bit sintetizado)

**Responsável:** Claude (Andrio aprovou som no jogo: "pode sim já adicionar
som no v2"; ciclo contínuo dos Master Prompts)
**Arquivos alterados:** index.html, sw.js

## Por que sintetizado (e não os OGGs do Kenney)
Os zips de áudio (rpg-audio, interface-sounds, music-jingles) não estavam
mais no ambiente de trabalho — só os packs visuais. Em vez de travar o
ciclo, o som foi SINTETIZADO com WebAudio (osciladores square/triangle/
sawtooth com envelope): estética chiptune que casa com a pixel art pico-8,
ZERO download, funciona offline e não pesa no cache. Quando o Andrio
reenviar os zips de áudio, os OGGs encaixam no mesmo sistema (AVSOM.toca).

## Efeitos
- ⚔️ **golpe** (acerto): 2 squares subindo (660→990Hz)
- 💥 **erro**: sawtooth descendo (220→147Hz)
- 🏆 **vitória**: arpejo dó-mi-sol-dó (C5→C6)
- 🎁 **drop**: sino triangle subindo (784→1568Hz)
- 👾 **encontro**: 2 notas de alerta
- 👑 **chefe**: fanfarra grave ameaçadora (sol-sol-sol-mib — clin d'oeil à 5ª)
- 💀 **derrota**: descida triste (sol-mi-dó-sol grave)

## Controle
- Botão 🔊/🔇 no HUD do jogo; a escolha fica salva NA CONTA
  (`aventura.mudo`, sincroniza na nuvem como o resto do progresso)
- AudioContext criado só após gesto do usuário (política de autoplay do
  celular respeitada — todos os sons nascem de cliques)

## Testes executados (Chromium mobile, servidor real)
Regressão completa da v1.1 (ordem dos monstros, stick flutuante, intro,
chefe, viagem) ✓ · os 7 efeitos tocam sem erro (AudioContext "running") ✓
· 🔇 alterna, persiste em avDados().mudo e volta ✓ · `node --check` ✓.

sw.js: cache v49 → v50.
Backlog do próximo ciclo: NPCs com mistérios PT/EN, baús escondidos,
escrever a resposta nos níveis altos, save de posição, biomas Roguelike,
OGGs do Kenney quando reenviados.
