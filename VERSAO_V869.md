# V869 — 27/07/2026 — 💵 Números & Dólares + 🔊 explicações faladas em PT

**Responsável:** Claude (pedidos do Andrio: "ensine a pessoa aprender
números, 130 dólares, 5 mil dólares… explique como é os números" + "a
pessoa também pode usar o áudio pra ouvir a explicação de alguma tarefa")
**Arquivos alterados:** index.html, sw.js

## 💵 Jogo novo: Números & Dólares (aba Jogos)
Nos EUA salário, preço e horas passam por números — quem não entende de
ouvido perde dinheiro. O treino tem DUAS partes:

**📖 Aprenda as regras** (6 lições):
1. 0–12: cada um tem nome próprio · 2. 13–19: família TEEN ·
3. 20/30/40…: família TY (twenty-one = 21) · 4. HUNDRED
(130 = one hundred thirty) · 5. THOUSAND ($5,000 = five thousand
dollars) · 6. Dólares no dia a dia (fifteen dollars an hour)
- 28 exemplos clicáveis com 🔊 áudio em INGLÊS
- Cada regra tem botão **🔊 Explicação** que FALA a regra em PORTUGUÊS
  (voz pt-BR) — dá pra aprender só ouvindo

**🎮 Treine** (10 rodadas, 4 níveis: 0–20 · 21–99 · 100–999 · Dólares
e mil):
- Modo VER: aparece $130 → escolha "one hundred thirty dollars"
- Modo OUVIR: áudio em inglês → escolha o número certo
- Modo DIGITAR (níveis altos): ouça e digite os algarismos — igual
  anotar um valor falado no telefone
- Alternativas erradas são vizinhas de verdade (pegadinha honesta);
  XP por acerto, habilidade de escuta alimentada, 10/10 = 🌻12

## 🔊 Explicação falada em TODAS as tarefas (acessibilidade)
- Motor de fala ganhou `Fala.dizerPT()` (voz pt-BR)
- TODO tutorial de jogo agora tem "🔊 Ouvir a explicação" — lê os
  passos em voz alta pra quem tem dificuldade de leitura; fechar o
  modal para o áudio

## ℹ️ Sobre "bases separadas por nível"
Já existe e foi conferido: quem marca "🌱 Nunca aprendi" (nível 0)
começa a trilha do zero absoluto; "me viro"/"aperfeiçoar" entram com
níveis avançados já destravados + atalho pro Simulador de Entrevista.

## Testes executados (Chromium mobile 412px, login real)
Conversor: zero/thirteen/twenty-one/one hundred thirty/nine hundred
ninety-nine/five thousand/twelve thousand five hundred ✓ · tutorial com
botão 🔊 ✓ · menu com 28 exemplos + 6 explicações PT ✓ · nível 1: 10/10
com os 3 modos ✓ · nível Dólares fala "nine thousand six hundred
dollars" ✓ · tabbar visível o tempo todo ✓ · `node --check` ✓.

sw.js: cache v55 → v56.
