# V856 — 26/07/2026 — 🏰 Masmorra v2: início/meio/fim completos + 1º clique da Home

**Responsável:** Claude (pedido direto do Andrio: "a pessoa deve responder e
o jogo faz animação se ela passar e mostrar que passou, faça todo sistema
de início meio e fim! foque em jogo realista! perfeito e ele deve ficar
como primeiro clique na página home! com imagem pra mostrar como é o jogo")
**Arquivos alterados:** index.html, sw.js

## INÍCIO — tela de abertura de jogo de verdade
- Cena animada no canvas (herói patrulhando entre as portas, estrela
  flutuando, coração no canto) antes de começar
- Recordes na cara: ⭐ melhor corrida, 👑 coroas (corridas perfeitas),
  🏃 total de corridas — salvos pra sempre no progresso (sincroniza)
- A cota do modo grátis só é gasta ao apertar "⚔️ ENTRAR NA MASMORRA"

## MEIO — gameplay com animação de verdade
- **Acertou**: "PASSOU!" estourando na tela, a porta abre e o herói
  ENTRA na passagem (esmaece na escuridão do arco), estrela sobe, e a
  sala termina num fade-out → "SALA N" anunciada no escuro → fade-in
- **Errou**: "OUCH!", tremida de tela (screen shake), monstro saltando
  da porta, herói recuando com quique, coração quebra no HUD
- **Trilha das 10 salas** no topo: verde = passou, vermelho = errou,
  amarelo = sala atual
- Máquina de estados 100% por frame (zero setTimeout) — sem corridas de
  animação, transições sempre sincronizadas

## FIM — placar com festa
- Vitória perfeita: chuva de ⭐/🌻 animada + coroa pulando + "PERFEITO!
  Rei da Masmorra!"; derrota: 💔 "Os monstros venceram..."
- Linha de 🟩🟥 mostrando sala a sala como foi a corrida
- "🎉 NOVO RECORDE PESSOAL!" quando bate o próprio recorde

## 🏠 Primeiro clique da Home (como pedido)
- Logo abaixo do painel de personagem: card escuro de masmorra com o
  **jogo RODANDO AO VIVO em miniatura** dentro dele (herói andando,
  portas, corações) — a "imagem de como é o jogo" é o próprio jogo —
  e botão dourado JOGAR pulsando
- O preview para sozinho ao sair da Home (zero bateria desperdiçada)

## Testes executados (Node + Chromium, servidor real)
Card na Home ✓ preview animando de verdade (2 frames do canvas diferem)
✓ clique → abertura com recordes ✓ ENTRAR → fade-in → "escolha" ✓
corrida completa com 1 erro proposital: PASSOU!/OUCH!/shake/trilha ✓
final com placar, 🟩🟥 e recorde ✓ zero erros de página ✓.

sw.js: cache v42 → v43.
