# V845 — 19/07/2026 — 🧗 Modo Carreira refeito (vocabulário puro) + 📄 Jornada H-2B

**Responsável:** Claude (ordem direta do Andrio, dono do produto: "o modo
carreira não pode ser perguntas difíceis tipo entrevista, nem resposta
pessoal — e sim sobre palavras em inglês. Refaça do seu jeito.")
**Arquivos alterados:** index.html, sw.js

## 🧗 Modo Carreira — reescrito do zero
O modelo anterior (V828) gerava perguntas de entrevista com resposta
livre e pontos-chave pessoais ("por que isso te diferencia?", "o que
você teria feito diferente?"). Substituído por um motor de
**vocabulário puro**, mantendo a história em temporadas/capítulos
(que funciona bem e o Andrio não pediu pra tirar):

- Cada capítulo (Agência, Vaga, Visto, Chegada, Trabalho, Fim de
  Temporada) agora é um **pacote de palavras temáticas** da jornada
  H-2B/H-2A + o vocabulário da vaga da pessoa
- 3 modos de treino por palavra — **ler** (vê o EN, escolhe o PT),
  **ouvir** (só áudio, escolhe o PT), **escrever** (vê o PT, digita o
  EN) — Temporada 1 só ler; Temporada 2 soma ouvir; Temporada 3+ soma
  escrever
- Errou? A palavra volta pra fila (até 2 reapresentações) — mesma
  mecânica de domínio de antes, sem o conteúdo pessoal
- Distratores agora são outros SIGNIFICADOS do próprio pool (não mais
  frases genéricas tipo "eu não quero responder isso")
- Removido: CARR_TEMPLATES (perguntas de entrevista), CARR_FOLLOWUPS
  (follow-up "por que isso importa pra você"), CARR_DISTRATORES
  (frases evasivas), toda avaliação por palavras-chave em texto livre
- `carrPoolCapitulo()` reaproveita o pool da 📌 Palavra da Vez pro
  capítulo "Fim de Temporada" (palavras de impacto: achievement,
  perseverance...) — mesma fonte, zero duplicação de manutenção

## 📄 Jornada H-2B — 3 aulas novas na trilha (nível "livre", sempre aberto)
1. **Documentos e Consulado** — passport, visa, application form,
   appointment, consulate, fingerprints, employer, approved, denied,
   ties — com diálogo de entrevista de visto completo
2. **Chegada nos EUA** — immigration, luggage, connecting flight,
   Social Security number, housing, roommate, deposit, grocery store,
   SIM card, ride
3. **Primeira Semana de Trabalho** — orientation, badge, clock in/out,
   schedule, paycheck, direct deposit, overtime, "Can you repeat
   that?", "Got it!", "Do you need a hand?"

Vocabulário compartilhado com o Modo Carreira (capítulos Visto/
Chegada/Trabalho) — quem faz a aula já treina no jogo com as mesmas
palavras, reforço cruzado real.

## Testes executados (Chromium — 0 erros de página)
50 exercícios gerados: 100% formato vocabulário puro (nunca
pontos-chave pessoais) ✓ · Temporada 1 só gera modo "ler" ✓ · Carreira
abre sem menção a "entrevistador" ✓ · 3 respostas certas fecham o
capítulo 1 e mostram o flavor text certo ("a agência aprovou") ✓ ·
4 certas fecham o capítulo 2 e mostram "CONTRATADO!" ✓ · errar
adiciona a palavra na fila (testado via clique real, escopado na
bolha certa) ✓ · feedback mostra "PALAVRA" (não mais "RESPOSTA
MODELO") ✓ · sintaxe completa ✓.

sw.js: cache v31 → v32.
