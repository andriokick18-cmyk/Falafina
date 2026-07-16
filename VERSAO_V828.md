# V828 — 16/07/2026 — 🧗 MODO CARREIRA 2.0: sua história nos EUA em temporadas

**Responsável:** Claude (decisão de dono: o modelo antigo era fraco — trocado inteiro)
**Arquivos alterados:** index.html, server.js, sw.js

## Por que o modelo antigo era ruim
1. "Jornada infinita" com só ~16 perguntas-base — repetia tudo já no nível 10
2. Múltipla escolha com distratores absurdos ("Isso é segredo") — acertava sem saber inglês
3. Nível era só um contador de acertos: nível 40 e 400 eram idênticos
4. Pergunta errada nunca voltava — zero fixação
5. Não havia "carreira" nenhuma: sem história, sem contratação, sem chegada

## O novo modelo
**Cada TEMPORADA é a jornada real do H-2B/H-2A em 6 capítulos:**
📞 A Agência (3) → 🤝 A Vaga (4) → 🏛️ O Visto (3) → 🛬 A Chegada (3)
→ 👷 A Temporada de Trabalho (5) → 🏆 Fim de Temporada (3)

- **Empresa e cidade são SUAS a temporada inteira** (sorteadas no início,
  usadas nas perguntas do consulado/imigração — consistência como na vida real)
- **Fila de domínio:** resposta fraca/errada VOLTA depois de ~2 perguntas
  (até 2 reapresentações), marcada "🔁 DE NOVO — agora você sabe!"
  Capítulo só fecha com N respostas FORTES.
- **História com marcos:** balões de "CONTRATADO!", "VISTO APROVADO!",
  "Bem-vindo aos EUA!"… Fechar os 6 capítulos = temporada concluída:
  "salário" (XP 100+50/temporada + girassóis) e convite pra próxima.
- **Dificuldade por temporada:** T1 = aprende (múltipla escolha nos 2
  primeiros capítulos); T2 = resposta livre + perguntas só de ouvido 👂;
  T3+ = avançado 👑 (ajudas escondidas).
- **Distratores plausíveis:** as opções erradas agora são respostas-modelo
  de OUTRAS perguntas do capítulo — pra acertar tem que entender a pergunta.
- **Variedade real:** além dos templates, o motor puxa dos 128 itens do
  BANCO_SIM (banco do Simulador) nas etapas equivalentes.
- **Novo capítulo "Fim de Temporada":** 4 perguntas novas de avaliação
  (voltar ano que vem / o que aprendeu / parte mais difícil / crew leader).

## Migração e sincronização
- Contas antigas: `temporada = floor((nivel-1)/21)+1` — quem tinha nível 50
  começa na Temporada 3, sem perder nada. `nivel` segue como contador de
  respostas fortes (ranking do servidor continua funcionando).
- **server.js**: merge da carreira agora preserva os campos novos —
  contadores pegam o maior; posição na história (temporada→cap→capOk) vem
  do lado mais avançado. Mesma regra no merge do cliente.
- sw.js: cache v15 → v16.

## Testes executados (runtime, Chromium — 0 erros de página)
Migração nível 50 → Temporada 3 ✓ · temporada 1 jogada INTEIRA de ponta a
ponta (21 respostas fortes: 7 MC + 14 livres, 6 capítulos na ordem, balões
de CONTRATADO e TEMPORADA CONCLUÍDA, +679 XP e +🌻248) ✓ · resposta errada
entra na fila e VOLTA marcada 🔁 ✓ · Home mostra "Temporada 2 · Capítulo
3/6" ✓ · Hub mostra "Modo Carreira — Temporada 2" ✓ · sintaxe index +
server ✓.
