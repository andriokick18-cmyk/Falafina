# V824 — 13/07/2026 — Tutoriais dos Jogos + Explicador de Conexão

**Responsável:** Claude (a pedido do Andrio)
**Arquivos alterados:** index.html, server.js

## O problema
O V822 criou o ecossistema de jogos e a Learning Engine, mas NINGUÉM
explicava ao usuário como cada jogo funciona, como pontuar, nem que os
jogos se conectam entre si. Usuário perdido não joga.

## O que mudou

### 1. Tutorial de primeira vez em CADA jogo
Na primeira vez que abre qualquer jogo, um modal ensina em 2-4 passos
visuais: a mecânica, como pontuar/subir, e a habilidade que treina.
Exemplos do conteúdo: Carreira explica os 3 estágios (múltipla escolha →
livre → sem ajuda) e que 1 palavra não sobe de nível; Ditado explica as
3 vidas, o combo e que "I'm" = "I am"; Entrevista explica os pontos-chave
e o timer opcional. Depois de visto, nunca mais interrompe (flag salva e
sincronizada — merge por união no servidor).

### 2. Botão "?" permanente
Cada card de jogo no Hub (e o herói da Carreira) tem um "?" no canto que
reabre o tutorial quando quiser, sem abrir o jogo junto.

### 3. "🧠 Como os jogos se conectam"
Link no painel de habilidades abre um explicador da Learning Engine em
linguagem de gente: cada jogo treina uma habilidade → tudo alimenta as
barras → o Fininho recomenda pelo ponto fraco → erros de um jogo viram
treino nos outros. A conexão que existia por baixo agora é VISÍVEL.

## Detalhes técnicos
- Reuso do modal genérico (bauOverlay) — zero markup novo de overlay.
- tutoriaisVistos{} sincronizado com merge por união (nunca re-mostra).
- stopPropagation nos "?" pra não disparar o jogo junto.
- Sintaxe validada após cada etapa.
