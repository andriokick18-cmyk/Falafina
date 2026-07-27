# V862 — 27/07/2026 — ⚔️ AVENTURA v1.1: mobile-first + ordem dos monstros + janela do Herói

**Responsável:** Claude (bugs reportados pelo Andrio: "o personagem anda
estranho, a tela ta toda cortada, no navegador do celular nao da pra jogar…
os monstros level mais fortes só podem ser atacados após o mais fraco
morrer, nao pode ir direto pro chefe… tem que ter uma janela com o corpo
onde mostra os itens equipados" + Master Prompts de auditoria contínua)
**Arquivos alterados:** index.html, sw.js

## 🐛 Os 3 bugs de celular — causa raiz e conserto
- **"Anda estranho"**: a velocidade era por FRAME (0.9px/frame). Celular
  de 120Hz roda o dobro de frames → herói 2x mais rápido e animação
  acelerada. Agora o movimento é por TEMPO REAL (`dt` do
  `performance.now()`): mesma velocidade em qualquer tela. Animação de
  caminhada virou ciclo passo-meio-passo-meio (307/308/309/308) por
  milissegundos — e o bug do herói virar ARBUSTO no 3º frame já tinha
  sido corrigido na V861.
- **"Tela toda cortada"**: a escala usava `floor` e deixava o mundo
  MENOR que a tela (faixas pretas enormes + mundo espremido no meio).
  Agora a escala COBRE a tela (`ceil` do maior eixo): zero barra preta,
  câmera segue o herói com clamp na borda do mapa. Buffer do canvas em
  pixels REAIS do aparelho (devicePixelRatio até 3x) — pixel art nítida
  em tela retina. HUD/batalha/stick com `env(safe-area-inset-*)`.
- **"No celular não dá pra jogar"**: o analógico era um alvo fixo de
  128px no canto. Agora é FLUTUANTE (padrão Brawl Stars/Genshin): toque
  em QUALQUER lugar livre e arraste — o direcional nasce embaixo do
  dedo, rastreia pelo identifier do toque (multi-touch seguro) e o
  botão ⛶ some no iPhone (sem Fullscreen API).

## 🎯 Reestruturação do início (estudo dos 100 RPGs)
- **Monstros acordam EM ORDEM**: do mais fraco pro mais forte, chefe por
  último — NÃO dá mais pra ir direto no chefe. Os que dormem aparecem
  apagados com rótulo "zZz"; encostar neles só avisa quem é o alvo.
- **Seta-guia dourada** pulsando em volta do herói apontando o alvo da
  vez + **banner de missão** no topo ("🎯 Slime Verdejante Nv1") — o
  jogador NUNCA fica perdido (o que fazer, onde, por quê).
- **Cartão de chegada do mapa**: elemento, ordem dos alvos
  (Nv1 → Nv2 → Nv3 → 👑 CHEFE), recompensa do chefe e aviso de tier 2.
- **Feedback de progresso**: ao vencer, o próximo monstro "ACORDOU" com
  toast; rótulos perto do topo do mapa descem pra não brigar com o HUD.

## 🧍 Janela do Herói (paper doll)
- Botão 🧍 Herói no HUD abre o CORPO do personagem: coroa na cabeça,
  amuleto no pescoço, espada e escudo nas mãos, orbe e livro — slot
  vazio fica tracejado com o item em cinza ("vazio"), equipado fica
  dourado. Corações atuais embaixo do boneco + poções e vitórias.
- Ensina a meta: "slots vazios? Os itens DROPAM dos monstros!"

## ⚖️ Economia
- Chefe dá **🌻 15 SÓ na 1ª vitória de cada mapa** (junto do destravar)
  — recompensa palpável sem farm infinito de girassóis.
- Caminhos do mapa agora são uma CRUZ contínua (antes: quadrados soltos
  que pareciam glitch).

## Testes executados (Chromium mobile 390×780, touch real via CDP, DPR 3)
Intro do mapa ✓ · fase trava até "Explorar" ✓ · canto da tela é MAPA
(zero barra preta) ✓ · buffer 3x retina ✓ · velocidade 25px/500ms
(~54px/s alvo) ✓ · stick nasce embaixo do dedo e move o herói ✓ · solta
= para ✓ · janela do Herói com 6 slots vazios + corações ✓ · Nv3
dormindo NÃO abre batalha ✓ · CHEFE trancado ✓ · Nv1 abre ✓ · morto →
alvo vira Nv2 ✓ · sequência completa até o chefe ✓ · destrava mapa 2 ✓ ·
viagem → intro do mapa 2 (Costa/Água) ✓ · `node --check` ✓.

sw.js: cache v48 → v49.
Próximo ciclo (v2): SOM (packs recebidos), NPCs com falas PT/EN e
mistérios, baús escondidos, escrever a resposta nos níveis altos, save
de posição, biomas dos packs Roguelike.
