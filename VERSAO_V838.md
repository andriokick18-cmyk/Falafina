# V838 — 17/07/2026 — ✂️ Jogos enxutos: lista de treinos em vez de mural de cartões

**Responsável:** Claude (modo "Próximo" — continuação da Grande
Simplificação V837, mandato do dono: "o mais resumido possível")
**Arquivos alterados:** index.html, sw.js

## O problema
A tela de Jogos empilhava: faixa de área + hero da Carreira + card do
Fininho + card de MISSÕES (duplicado da Home!) + 8 cartões gigantes de
jogo + barras de habilidade + "continuar de onde parou". Rolagem enorme,
informação repetida, decisão difícil.

## O que mudou
1. **Fora as missões duplicadas** — elas moram no Início, ponto.
2. **8 cartões viraram lista compacta**: 1 linha por treino (ícone,
   nome, o que treina, "?" de tutorial) — a tela inteira cabe em uma
   rolagem curta e a escolha ficou escaneável.
3. **Fininho recomenda** em largura total logo abaixo da Carreira —
   quem não sabe o que jogar tem a resposta na cara.
4. Hierarquia final: 🧗 Carreira (principal) → 🦜 recomendação →
   🎮 lista de treinos → 📊 habilidades. Simples assim.

## Testes executados (Chromium — 8 checagens, 0 erros de página)
Sem "Missões de hoje" na tela de Jogos ✓ · 7 treinos em linha compacta
(0 cartões antigos) ✓ · Fininho em largura total ✓ · hero da Carreira
vivo ✓ · clique na linha abre tutorial de 1ª vez e depois o jogo ✓ ·
"?" abre tutorial sem sair da tela ✓ · 5 barras de habilidade ✓.

sw.js: cache v25 → v26.
